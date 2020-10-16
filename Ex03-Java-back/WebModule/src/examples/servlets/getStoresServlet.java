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
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

/*
* input:
*       zone:
*       store (ID)):
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

@WebServlet(name = "getStoresServlet", urlPatterns = "/getStores")
public class getStoresServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);

        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");


        if(requestData.has("zone")) {
            SuperMarket superMarket = SystemManager.getInstance().getSuperMarketByLocation(requestData.get("zone").getAsString());
            String zone = requestData.get("zone").getAsString();
            if (requestData.has("store") && !requestData.get("store").equals("")) {
                Store store = superMarket.getStores().get(requestData.get("store").getAsInt());
                response.getWriter().append(gson.toJson(createStoreJson(store, zone)));
            } else {
                JSONObject itemsInfo = new JSONObject();
                HashMap<Integer, Store> stores = superMarket.getStores();
                for (Store store : stores.values()) {
                    JSONObject singleItemInfo = createStoreJson(store, zone);
                    itemsInfo.put(store.getName(), singleItemInfo);
                }
                response.getWriter().append(gson.toJson(itemsInfo));
            }
        }

    }
    public JSONObject createStoreJson( Store store, String zone){
        JSONObject storeInfo = new JSONObject();
        String owner = SystemManager.getInstance().getOwnerOfZone(zone);
        storeInfo.put("id", store.getId());
        storeInfo.put("name", store.getName());
        storeInfo.put("owner", owner);
        storeInfo.put("location", store.getLocation());
        storeInfo.put("ordersCount", store.getOrders().size());
        storeInfo.put("totalEarning", store.getTotalEarning().toString());
        storeInfo.put("ppk", store.getDeliveryPpk());
        storeInfo.put("totalShipmenEarning", store.getTotalShipmentEarning());
        storeInfo.put("itemsStoreSell", createSellObject(store.getItemsToSell(), zone));
        return storeInfo;
    }

    private JSONObject createSellObject(List<Sell> itemsToSell, String zone) {
        JSONObject sellsInfo = new JSONObject();
        JSONObject singleSellInfo = new JSONObject();
        SuperMarket superMarket = SystemManager.getInstance().getSuperMarketByLocation(zone);
        for(Sell sell:itemsToSell){
            Item item = superMarket.getItemByID(sell.getItemId());
            singleSellInfo = new JSONObject();
            singleSellInfo.put("id", sell.getItemId());
            singleSellInfo.put("name", item.getName());
            singleSellInfo.put("purchaseCategory", item.getPurchaseCategory());
            singleSellInfo.put("price", sell.getPrice());
            singleSellInfo.put("timesSold", sell.getNumberOfTimesItemWasSold());
            sellsInfo.put(item.getName(), singleSellInfo);
        }
        return sellsInfo;
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


