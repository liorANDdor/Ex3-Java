package examples.servlets;

import SDMModel.*;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.stream.Collectors;


@WebServlet(name = "NewItemServlet", urlPatterns = "/createItem")
public class NewItemServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        HttpSession session = request.getSession();
        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);

        String itemName = requestData.get("name").getAsJsonObject().get("value").getAsString();

        String zone =  requestData.get("zone").getAsJsonObject().get("value").getAsString();
        SuperMarket sdm = SystemManager.getInstance().getSuperMarketByLocation(zone);

        int itemId = sdm.getItems().size() + 1;
        Item.PurchaseCategory purcahseCatagory = requestData.get("name").getAsJsonObject().get("value").getAsString().equals("Weight") ?
                Item.PurchaseCategory.WEIGHT : Item.PurchaseCategory.QUANTITY;
        JsonArray stores = requestData.get("stores").getAsJsonObject().get("value").getAsJsonArray();
        Item newItem = new Item(itemName, itemId, purcahseCatagory);
        ArrayList<Store> storesWhoSellItem = new ArrayList();
        for (JsonElement item : stores) {
            JsonObject specificStore = item.getAsJsonObject();
            if (specificStore.get("chosen").getAsBoolean()) {
                int storeId = specificStore.get("id").getAsInt();
                sdm.getStores().get(storeId).getItemsToSell().add(new Sell(itemId, specificStore.get("price").getAsDouble()));
                storesWhoSellItem.add(sdm.getStores().get(storeId));
            }
        }
        newItem.setStoresWhoSellTheItem(storesWhoSellItem);

        sdm.getItems().put(newItem.getId(), newItem);

        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.getWriter().append(gson.toJson(true));

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


