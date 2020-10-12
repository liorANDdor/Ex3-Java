package examples.servlets;

import SDMModel.*;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.stream.Collectors;

/*
 * input:
 *       zone:
 *
 *output:
 *       customerName:
 *       Date:
 *       rating:
 *       comments(optional:
 * */
@WebServlet(name = "getFeedbacksServlet", urlPatterns = "/getFeedbacks")
public class getFeedbacksServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        HttpSession session = request.getSession();
        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);
        String userName = session.getAttribute("userName") != null ? session.getAttribute("userName").toString() : null;
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        if (requestData.has("zone")) {
            Seller seller = (Seller) SystemManager.getInstance().getUsers().get(userName);
            Rating rating = seller.getRating().get(requestData.get("zone").toString());
            response.getWriter().append(gson.toJson(rating));
        }
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }


    @Override
    public String getServletInfo() {
        return "Short description";
    }
}


