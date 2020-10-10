package examples.servlets;

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
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

ע
@WebServlet(name = "getZoneDataServlet", urlPatterns = "/getZoneData")
public class getZoneDataServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        HttpSession session = request.getSession();
        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);


        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        String zone = requestData.get("zone").getAsString();
        SuperMarket superMarket = SystemManager.getInstance().getSuperMarketByLocation(zone);
        JSONObject zoneInfo = new JSONObject();
        String owner = SystemManager.getInstance().getOwnerOfZone(zone);
        zoneInfo.put("owner", SystemManager.getInstance().getOwnerOfZone(zone));
        zoneInfo.put("name", zone);
        zoneInfo.put("itemsCount", superMarket.getItems().size());
        zoneInfo.put("storesCount", superMarket.getStores().size());
        zoneInfo.put("orderCount", superMarket.getOrders().size());
        zoneInfo.put("averageOrderPrice", superMarket.getOrdersAveragePrice());
        response.getWriter().append(gson.toJson(zoneInfo));

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


