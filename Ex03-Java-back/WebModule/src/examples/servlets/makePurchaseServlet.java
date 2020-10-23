package examples.servlets;

import SDMModel.*;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.sun.org.apache.xpath.internal.operations.Or;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

/*
 * input:
 *       isDynamic:Boolean
 *       zone:
 *       storeId:(if not dynamic)
 *       items:json(id, quantity)
 *       customerLocationX:
 *       customerLocationY:
 *
 *
 *output:
 *       wasAdded:
 *       orderId:
 * */

@WebServlet(name = "makePurchaseServlet", urlPatterns = "/makePurchase")
public class makePurchaseServlet extends HttpServlet {
    private HashMap<Integer, Order> subOrders = new HashMap<>();
    private Order order = new Order();



    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        JSONObject orderStatus = new JSONObject();
        HttpSession session = request.getSession();
        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);
        SystemManager sys = SystemManager.getInstance();
        SuperMarket sdm = sys.getSuperMarketByLocation(requestData.get("zone").getAsString());
        Point location = new Point(requestData.get("customerLocationX").getAsInt(), requestData.get("customerLocationY").getAsInt());
        String userName = session.getAttribute("userName") != null ? session.getAttribute("userName").toString() : null;
        Customer user = (Customer) SystemManager.getInstance().getUsers().get(userName);
        String dateAsString = requestData.get("date").getAsString().substring(0, 10);
        SimpleDateFormat formatter6=new SimpleDateFormat("yyyy-mm-dd");
        Date date1 = null;
        try {
             date1=formatter6.parse(dateAsString); // 2020-10-20T15:41:46.622Z
        } catch (ParseException e) {
            e.printStackTrace();
        }
        user.setLocation(location);
        String isDynamic = requestData.get("isDynamic").getAsString();
        order.setOrderCustomer(user);
       
        order.setDateOfOrder(date1);
        if (isCustomerLocationFine(sdm, location)) {
            if (isDynamic.equals("True") || isDynamic.equals("true")) {
                for (Map.Entry<String, JsonElement> item : requestData.get("items").getAsJsonObject().entrySet()) {
                    int itemId = Integer.parseInt(item.getKey());
                    Store store = sys.getItemLowestPrice(sdm, itemId);
                    double itemQuantity = item.getValue().getAsDouble();
                    sys.addAnItemToOrder(sdm, order, subOrders, store, itemId, itemQuantity);
                }
                sys.commitOrder(sdm, order);
            } else if (isDynamic.equals("False") || isDynamic.equals("false")) {
                Store store = sdm.getStores().get(requestData.get("storeId").getAsInt());
                for (Map.Entry<String, JsonElement> item : requestData.get("items").getAsJsonObject().entrySet()) {
                    int itemId = Integer.parseInt(item.getKey());
                    double itemQuantity = item.getValue().getAsDouble();
                    sys.addAnItemToOrder(sdm, order, subOrders, store, itemId, itemQuantity);
                }
                sys.commitOrder(sdm, order);
            }
            notifySellers(order);
            orderStatus.put("wasAdded", true);
            orderStatus.put("orderId", order.getOrderNumber());
            response.getWriter().append(gson.toJson(orderStatus));
        }
        else {
            orderStatus.put("wasAdded", false);
            orderStatus.put("error", "Location entered belongs to another store");
            response.getWriter().append(gson.toJson(orderStatus));
        }
    }

    private void notifySellers(Order aggregatedOrder) {
        int orderId = aggregatedOrder.getOrderNumber();
        for(Store store:aggregatedOrder.getStoresToOrderFrom().keySet()){
            Order order = store.getOrders().get(orderId);
            webSocketServlet.broadcast(
                    store.getStoreOwner().getName(), "The user " + order.getOrderCustomer().getName() +
                            " purchased order " + orderId + "#\n" + "The order price is " + order.getItemsPrice() +
                            " and the shipment price is " + order.getShipmentPrice() + " with total of "
                            + order.getItemsQuantity().size() + " different items ");

        }
    }

    private boolean isCustomerLocationFine(SuperMarket sdm, Point customerLocation) {

        boolean isLocationFine = true;

        int count = 0;
        count += sdm.getStores().values()
                .stream()
                .filter(store -> store.getLocation().getX() == customerLocation.x && store.getLocation().getY() == customerLocation.getY())
                .count();
        if (count > 0) {
            isLocationFine = false;
        }

        return isLocationFine;
    }

    private JSONObject createZoneData(SuperMarket superMarket) {
        JSONObject zoneInfo = new JSONObject();
        zoneInfo.put("owner", SystemManager.getInstance().getOwnerOfZone(superMarket.getZone()));
        zoneInfo.put("name", superMarket.getZone());
        zoneInfo.put("itemsCount", superMarket.getItems().size());
        zoneInfo.put("storesCount", superMarket.getStores().size());
        zoneInfo.put("orderCount", superMarket.getOrders().size());
        zoneInfo.put("averageOrderPrice", superMarket.getOrdersAveragePrice());
        return zoneInfo;

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


