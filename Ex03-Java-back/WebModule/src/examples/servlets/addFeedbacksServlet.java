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
        int rating = requestData.get("rate").getAsJsonObject().get("nubmer").getAsInt();
        String ratingMessage = requestData.get("rate").getAsJsonObject().get("message").getAsString();
        String zone = requestData.get("zone").getAsString();
        int orderId = requestData.get("orderId").getAsInt();
        Order order = SystemManager.getInstance().getSuperMarketByLocation(zone).getOrders().get(orderId);
        Date orderDate = order.getDateOfOrder();
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        String storeName = requestData.get("store").getAsString();
        Store store = order.getStoresToOrderFrom().keySet().stream().filter(x -> x.getName().equals(storeName)).findAny().orElseGet(null);

        if (store!=null) {
            store.getRating().addFeedback(order.getOrderCustomer().getName(), store.getName(), order.getDateOfOrder(),rating, ratingMessage);
            webSocketServlet.broadcast(store.getStoreOwner().getName(), "Got new feedback:\n " + customer + " gave the store " +
                    storeName + ", " + rating + " stars");
        }
    }
/*

        for(Store store:order.getStoresToOrderFrom().keySet()) {
            store.getRating().addFeedback(order.getOrderCustomer().getName(), store.getName(), order.getDateOfOrder(),rating, ratingMessage);
            webSocketServlet.broadcast(store.getStoreOwner().getName(), "Got new feedback:\n " + customer + " gave the store " +
                    store.getName() +", " + rating + " stars");
        }
*/



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


