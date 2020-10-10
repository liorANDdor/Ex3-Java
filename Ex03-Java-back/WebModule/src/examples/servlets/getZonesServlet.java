package examples.servlets;

import SDMModel.SuperMarket;
import SDMModel.SystemManager;
import SDMModel.User;
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
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;


@WebServlet(name = "getZonesServlet", urlPatterns = "/getZones")
public class getZonesServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        HashMap<String, JSONObject> zonesInfo = new HashMap<>();
        HashSet<String> zones =  new HashSet<>();
        for(List<SuperMarket> superMarkets: SystemManager.getInstance ().getSuperMarkets().values())
            for(SuperMarket superMarket: superMarkets){
                JSONObject obj = createZoneData(superMarket);//zones.add(superMarket.getZone());
                zonesInfo.put(obj.get("name").toString(), obj);

            }
                response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.getWriter().append(gson.toJson(zonesInfo));


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


