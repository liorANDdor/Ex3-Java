package examples.servlets;

import SDMModel.*;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;


@WebServlet(name = "getDataServlet", urlPatterns = "/getData")
public class getDataServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        HttpSession session = request.getSession();

        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);


        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        String zone = request.getParameter("zone");
        if(requestData.has("zone")){
            SuperMarket superMarket = SystemManager.getInstance().getSuperMarketByLocation(requestData.get("zone").getAsString());
            superMarket.calcItemAveragePrice();
            if(!requestData.has("storeId") || requestData.get("storeId").getAsString().equals(""))
                response.getWriter().append(gson.toJson(superMarket));
            else{
                Store store = superMarket.getStores().get(requestData.get("storeId").getAsInt());
                if((!requestData.has("itemId") || requestData.get("itemId").getAsString().equals("") &&
                        !requestData.has("sales") || requestData.get("sales").getAsString().equals("")))
                    response.getWriter().append(gson.toJson(store));
                else{
                    if(requestData.has("itemId") && !requestData.get("itemId").getAsString().equals("")) {
                        Sell sell = store.getSellById(requestData.get("itemId").getAsInt());
                        response.getWriter().append(gson.toJson(sell));
                    }
                    else {
                        response.getWriter().append(gson.toJson(store.getSales()));
                    }
                }
            }
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


