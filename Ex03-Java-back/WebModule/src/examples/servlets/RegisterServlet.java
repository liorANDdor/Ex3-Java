package examples.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import SDMModel.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;



@WebServlet(name = "RegisterServlet", urlPatterns = "/register")
public class RegisterServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        HttpSession session = request.getSession();
        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);


        String role = requestData.get("role").getAsJsonObject().get("value").getAsString();
        String name = requestData.get("name").getAsJsonObject().get("value").getAsString();
        session.setAttribute("userName", name);
        SystemManager.userType userType =  role.equals("Customer") ? SystemManager.userType.Customer : SystemManager.userType.Seller; ;

        Boolean wasUserAdded = SystemManager.getInstance().addUser(name, userType);
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.getWriter().append(gson.toJson(wasUserAdded));

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


