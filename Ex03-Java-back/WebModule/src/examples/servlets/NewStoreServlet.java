package examples.servlets;

import SDMModel.Sell;
import SDMModel.Store;
import SDMModel.SuperMarket;
import SDMModel.SystemManager;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.Button;
import javafx.stage.Modality;
import javafx.stage.Stage;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.io.IOException;
import java.net.URL;
import java.util.stream.Collectors;


@WebServlet(name = "NewStoreServlet", urlPatterns = "/createStore")
public class NewStoreServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        HttpSession session = request.getSession();
        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);






        String storeName = requestData.get("name").getAsJsonObject().get("value").getAsString();
        int locationX = requestData.get("locationX").getAsJsonObject().get("value").getAsInt();
        int locationY = requestData.get("locationY").getAsJsonObject().get("value").getAsInt();
        int ppk = requestData.get("ppk").getAsJsonObject().get("value").getAsInt();
        int storeId =  requestData.get("storeId").getAsJsonObject().get("value").getAsInt();
        String zone =  requestData.get("zone").getAsJsonObject().get("value").getAsString();
        Store newStore = new Store(storeName, storeId, ppk, new Point(locationX, locationY));
        JsonArray items = requestData.get("items").getAsJsonObject().get("value").getAsJsonArray();

        for (JsonElement item : items) {
            JsonObject specificItem = item.getAsJsonObject();
            if(specificItem.get("chosen").getAsBoolean())
                newStore.getItemsToSell().add(new Sell(specificItem.get("id").getAsInt(), specificItem.get("price").getAsDouble()));
        }

        StringBuilder  errorMessage = new StringBuilder();
        SuperMarket sdm = SystemManager.getInstance().getSuperMarketByLocation(zone);
        boolean isStoreOk = SystemManager.getInstance().checkIfStoreOk(sdm, newStore, errorMessage);

        JSONObject newStoreInfo = new JSONObject();
        newStoreInfo.put("wasAdded", isStoreOk);
        newStoreInfo.put("error", errorMessage);

        if(isStoreOk) {
            String userName = (String) request.getSession().getAttribute("userName");
            newStore.setStoreOwner(SystemManager.getInstance().getUsers().get(userName));
            sdm.getStores().put(newStore.getId(), newStore);
            webSocketServlet.broadcast(SystemManager.getInstance().getOwnerOfZone(zone),"Hi Pal, new store named " + newStore.getName() + " in your Zone was added!!!");
        }
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.getWriter().append(gson.toJson(newStoreInfo));

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


