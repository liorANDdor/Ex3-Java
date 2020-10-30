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
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

/*
* input:
*       zone:
*       store (ID)): (optional)
*
*output:
*       id:
*       name:
*       owner:
*       location:
*       ordersCount:
*       totalEarning:
*       totalShipmentEarning:
*       ppk:
*       itemsStoreSell:(Json Object)
*
* */

@WebServlet(name = "getOrdersServlet", urlPatterns = "/getOrdersByUsername")
public class getOrdersServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        HashMap<Integer, JSONObject> ordersInfo = new HashMap<>();
        String userName = (String) request.getSession().getAttribute("userName");
        HashMap<Integer, Order> orders =  SystemManager.getInstance().getUsers().get(userName).getOrders();
        for (Order order:orders.values()){
            ordersInfo.put(order.getOrderNumber(), makeOrdersObject(order));
        }
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.getWriter().append(gson.toJson(orders));

    }

    private JSONObject makeOrdersObject(Order order) {
            JSONObject orderInfo = new JSONObject();
            orderInfo.put("id", order.getOrderNumber());
            orderInfo.put("date", order.getDateOfOrder());
            orderInfo.put("storesCount", order.getStoresToOrderFrom().size());
            orderInfo.put("customerLocation", order.getLocationOfClient());
            orderInfo.put("itemsPrice", order.getItemsPrice());
            orderInfo.put("shipmentPrice", order.getShipmentPrice());
            orderInfo.put("itemsAmound", order.getItemsQuantity().size());
            orderInfo.put("items", createItemsObject(order));

            orderInfo.put(order.getOrderNumber().toString(), orderInfo);

        return orderInfo;

    }

    private JSONObject createItemsObject(Order order) {
        JSONObject itemsInfo = new JSONObject();
        for(Item item:order.getItemsQuantity().keySet()){
            JSONObject itemInfo = new JSONObject();

            itemInfo.put("id", item.getId());
            itemInfo.put("name", item.getName());

            itemInfo.put("purchaseType", item.getPurchaseCategory());
            itemInfo.put("quantity", order.getItemsQuantity().get(item));
            itemInfo.put("price", order.getItemPrice(item.getId()));
            itemInfo.put("totalPrice", order.getItemPrice(item.getId()) * order.getItemsQuantity().get(item) );
            itemInfo.put("isFromDiscount", "No  ");
            itemsInfo.put(String.valueOf(item.getId()), itemInfo);

        }
        return itemsInfo;
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


