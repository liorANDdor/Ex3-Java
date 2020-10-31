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
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@WebServlet(name = "getFeedBackByUserServlet", urlPatterns = "/getFeedbacks")
public class getFeedbacksServlet extends HttpServlet {

    /*<Table
              columns={cols}
              data={feedbacks.map(feedback => ({  Client: feedback.clientName, Date: feedback.feedbackDate,
              Rate: feedback.rating, Message:feedback.comment}))}
              container={classes.container} />*/

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        String customer = session.getAttribute("userName") != null ? session.getAttribute("userName").toString() : null;
        Gson gson = new Gson();
        ArrayList<Rating.Feedback> feedbacks = new ArrayList<>();
        int storeIndex = 0;
        HashMap<String, HashMap<Integer, Rating.Feedback>> feedbackInfo = new HashMap<>();
        for (List<SuperMarket> superMarkets : SystemManager.getInstance().getSuperMarkets().values()) {
            for (SuperMarket superMarket : superMarkets) {
                for (Store store : superMarket.getStores().values())
                    if (store.getStoreOwner().getName().equals(customer)) {
                        if (store.getRating().getFeedbacks().size() > 0) {
                            for (Rating.Feedback feedback : store.getRating().getFeedbacks()) {
                                feedbacks.add(feedback);
                            }

                        }
                    }

            }
        }
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.getWriter().append(gson.toJson(feedbacks));
    }



    private JSONObject makeStoreObject(Store store) {
        JSONObject storeInfo = new JSONObject();
        storeInfo.put("name", store.getName());
        storeInfo.put("orders", makeOrdersObject(store.getOrders()));
        return storeInfo;
    }

    private JSONObject makeOrdersObject(HashMap<Integer,Order> orders) {
        JSONObject ordersInfo = new JSONObject();
        for(Order order:orders.values()) {
            JSONObject orderInfo = new JSONObject();
            orderInfo.put("id", order.getOrderNumber());
            orderInfo.put("date", order.getDateOfOrder());
            orderInfo.put("customer", order.getOrderCustomer());
            orderInfo.put("customerLocation", order.getLocationOfClient());
            orderInfo.put("itemsPrice", order.getItemsPrice());
            orderInfo.put("shipmentPrice", order.getShipmentPrice());
            orderInfo.put("itemsAmound", order.getItemsQuantity().size());
            orderInfo.put("items", createItemsObject(order));

            ordersInfo.put(order.getOrderNumber().toString(), orderInfo);
        }
        return ordersInfo;

    }

    private JSONObject createItemsObject(Order order) {
        JSONObject itemsInfo = new JSONObject();
        for(Item item:order.getItemsQuantity().keySet()){
            JSONObject itemInfo = new JSONObject();
            itemInfo.put("id", item.getId());
            itemInfo.put("name", item.getName());
            itemInfo.put("quantity", order.getItemsQuantity().get(item));
            itemInfo.put("price", order.getItemPrice(item.getId()));
            itemInfo.put("totalPrice", order.getItemPrice(item.getId()) * order.getItemsQuantity().get(item) );
            itemInfo.put("isFromDiscount", "No  ");
            itemsInfo.put(String.valueOf(item.getId()), itemInfo);

        }
        return itemsInfo;
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


