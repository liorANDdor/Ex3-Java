package examples.servlets;

import SDMModel.Store;
import SDMModel.SystemManager;
import SDMModel.User;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.stream.Collectors;


@WebServlet(name = "getStoresServlet", urlPatterns = "/getStores")
public class getStoresServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String rawStoreRegionData = request.getReader().lines().collect(Collectors.joining());
        Gson gson = new Gson();
        JsonObject storeRegionData = new Gson().fromJson(rawStoreRegionData, JsonObject.class);


        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");



        //HashMap<Integer, Store> stores =  SystemManager.getInstance().getSuperMarketByLocation(storeRegionData.get("id").toString()).getStores();
        HashMap<Integer, Store> stores = SystemManager.getInstance().getSuperMarket().getStores();

        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        response.getWriter().append(gson.toJson(stores));

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


