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

@WebServlet(name = "getOrdersServlet", urlPatterns = "/getOrders")
public class getOrdersServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);

        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        SuperMarket superMarket = SystemManager.getInstance().getSuperMarketByLocation(requestData.get("zone").getAsString());
        if (requestData.has("store") && !requestData.get("store").equals("")) {
            Store store = superMarket.getStores().get(requestData.get("store").getAsInt());
            response.getWriter().append(gson.toJson(store.getOrders()));
        } else {

            response.getWriter().append(gson.toJson(superMarket.getOrders()));
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


