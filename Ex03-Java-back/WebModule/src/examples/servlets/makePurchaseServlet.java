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
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
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
        HttpSession session = request.getSession();
        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);
        SystemManager sys = SystemManager.getInstance();
        SuperMarket sdm = sys.getSuperMarketByLocation(requestData.get("zone").getAsString());
        Point location = new Point(requestData.get("customerLocationX").getAsInt(), requestData.get("customerLocationY").getAsInt());
        String userName = session.getAttribute("userName") != null ? session.getAttribute("userName").toString() : null;
        Customer user = (Customer) SystemManager.getInstance().getUsers().get(userName);
        user.setLocation(location);
        String isDynamic = requestData.get("isDynamic").getAsString();
        order.setOrderCustomer(user);

        if (isDynamic.equals("True") || isDynamic.equals("true")) {
            for (Map.Entry<String, JsonElement> item : requestData.get("items").getAsJsonObject().entrySet()) {
                int itemId = Integer.parseInt( item.getKey());
                Store store = sys.getItemLowestPrice(sdm, itemId);
                double itemQuantity = item.getValue().getAsDouble();
                sys.addAnItemToOrder(sdm, order, subOrders, store, itemId, itemQuantity);
            }
            sys.commitOrder(sdm, order);
        }
        else if (isDynamic.equals("False") || isDynamic.equals("false")) {
            Store store = sdm.getStores().get(requestData.get("storeId").getAsInt());
            for (Map.Entry<String, JsonElement> item : requestData.get("items").getAsJsonObject().entrySet()) {
                int itemId = item.getValue().getAsJsonObject().get("id").getAsInt();
                double itemQuantity = item.getValue().getAsJsonObject().get("quantity").getAsDouble();
                sys.addAnItemToOrder(sdm, order, subOrders, store, itemId, itemQuantity);
            }
            sys.commitOrder(sdm, order);
        }
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


