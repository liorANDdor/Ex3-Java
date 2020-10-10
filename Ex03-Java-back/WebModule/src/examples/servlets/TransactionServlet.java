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
import java.util.stream.Collectors;


@WebServlet(name = "RegisterServlet", urlPatterns = "/register")
public class TransactionServlet extends HttpServlet {

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
            String dateEpoch = requestData.get("epoch").getAsString();
            String amountTransfered = requestData.get("amountTransfered").getAsString();
            MoneyAcount.TransferType transferType = stringToTransferType(requestData.get("transferType").getAsString());
            SystemManager.getInstance().getUsers().get(userName).addTransaction(Double.parseDouble(amountTransfered), transferType, new Date(Long.parseLong(dateEpoch)));
            wasTransactionAdded=true;
            response.getWriter().append(gson.toJson(wasTransactionAdded));
        }
       catch (Exception e){
           response.getWriter().append(gson.toJson(wasTransactionAdded));
           response.getWriter().append(gson.toJson(e.getCause()));
        }




    }

    private MoneyAcount.TransferType stringToTransferType(String transferType) {
        if(transferType.equals("Deposite") ||transferType.equals("deposite") )
            return MoneyAcount.TransferType.Deposite;
        else if(transferType.equals("Sell") ||transferType.equals("sell") )
            return MoneyAcount.TransferType.Sell;
        else
            return MoneyAcount.TransferType.Purchase;
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


