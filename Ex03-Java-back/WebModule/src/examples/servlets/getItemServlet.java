package examples.servlets;

import SDMModel.Item;
import SDMModel.Store;
import SDMModel.SuperMarket;
import SDMModel.SystemManager;
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
 *       item (optional):
 *
 *output:
 *       id:
 *       name:
 *       purchaseCategory:
 *       numOfStoresSellItem:
 *       averageItemPrice:
 *
 * */
@WebServlet(name = "getItemsServlet", urlPatterns = "/getItems")
public class getItemServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Gson gson = new Gson();
        HttpSession session = request.getSession();
        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);

        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        if(requestData.has("zone")) {
            SuperMarket superMarket = SystemManager.getInstance().getSuperMarketByLocation(requestData.get("zone").getAsString());
            if (requestData.has("item") && !requestData.get("item").equals("")) {
                Item item = superMarket.getItemByID(requestData.get("item").getAsInt());
                response.getWriter().append(gson.toJson(createItemJson(item)));
            } else {
                JSONObject itemsInfo = new JSONObject();
                HashMap<Integer, Item> items = superMarket.getItems();
                for(Item item: items.values()){
                    JSONObject singleItemInfo = createItemJson(item);
                    itemsInfo.put(item.getName(),singleItemInfo);
                }
                response.getWriter().append(gson.toJson(itemsInfo));
            }
        }

    }

    public JSONObject createItemJson( Item item){
        JSONObject itemInfo = new JSONObject();

        itemInfo.put("id", item.getId());
        itemInfo.put("name", item.getName());
        itemInfo.put("purchaseCategory", item.getPurchaseCategory());
        itemInfo.put("numOfStoresSellItem", item.getStoresWhoSellTheItem().size());
        itemInfo.put("averageItemPrice", item.getItemAveragePrice());
        itemInfo.put("timesSold", item.getNumberOfTimesItemWasSold());
       return itemInfo;
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


