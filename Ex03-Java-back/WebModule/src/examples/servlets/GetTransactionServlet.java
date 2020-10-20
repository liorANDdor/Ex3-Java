package examples.servlets;

import SDMModel.MoneyAcount;
import SDMModel.SystemManager;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import SDMModel.MoneyAcount;
import org.json.JSONObject;
/*
epoch: String(epoch time),
amountTransfered: double,
transferType: String(Sell/Deposit/Purchase)

* */


@WebServlet(name = "GetTransactionServlet", urlPatterns = "/getTransaction")
public class GetTransactionServlet extends HttpServlet {

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        HttpSession session = request.getSession();
        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);

        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        Boolean wasTransactionAdded = false;
        try {
            String userName = (String) request.getSession().getAttribute("userName");
            List<MoneyAcount.Transaction> transactions = SystemManager.getInstance().getUsers().get(userName).getAcount().getTransactions();
            if(transactions.size()<6)
                response.getWriter().append(gson.toJson(transactions));
            else
                response.getWriter().append(gson.toJson(transactions.subList(transactions.size()-5,transactions.size())));
        } catch (IOException e) {
            e.printStackTrace();
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


