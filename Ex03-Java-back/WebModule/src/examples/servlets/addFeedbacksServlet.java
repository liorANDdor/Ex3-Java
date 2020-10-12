package examples.servlets;

import SDMModel.*;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;
import java.util.stream.Collectors;

/*
 * input:
 *      zone:
 *      orderId:
 *      storeId:
 *      rating:
 *      comment(optional):
 *
 *output:
 * */
@WebServlet(name = "addFeedbacksServlet", urlPatterns = "/addFeedbacks")
public class addFeedbacksServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        HttpSession session = request.getSession();
        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);
        String customer = session.getAttribute("userName") != null ? session.getAttribute("userName").toString() : null;
        double rating = Double.parseDouble(requestData.get("rating").toString());
        int orderId =  Integer.parseInt(requestData.get("orderId").toString());
        int storeId =  Integer.parseInt(requestData.get("storeId").toString());
        String zone =  requestData.get("zone").toString();
        Order order = SystemManager.getInstance().getSuperMarketByLocation(zone).getOrders().get(orderId);
        Date orderDate = order.getDateOfOrder();
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        if (requestData.has("comment")) {
            String comment = requestData.get("comment").toString();
            SystemManager.getInstance().getSuperMarketByLocation(zone).getStores().get(storeId).getRating().addFeedback(customer, order.getDateOfOrder(), rating, comment);
        }
        else{
            SystemManager.getInstance().getSuperMarketByLocation(zone).getStores().get(storeId).getRating().addFeedback(customer, order.getDateOfOrder(), rating);
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


