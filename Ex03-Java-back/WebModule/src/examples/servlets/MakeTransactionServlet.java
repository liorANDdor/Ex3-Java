package examples.servlets;

import SDMModel.MoneyAcount;
import SDMModel.SystemManager;
import SDMModel.User;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.time.Instant;
import java.util.Date;
import java.util.stream.Collectors;

/*
epoch: String(epoch time),
amountTransfered: double,
transferType: String(Sell/Deposit/Purchase)

* */



@WebServlet(name = "MakeTransactionServlet", urlPatterns = "/makeTransaction")
public class MakeTransactionServlet extends HttpServlet {

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
            //String dateEpoch = requestData.get("epoch").getAsString();
            double amountTransfered = requestData.get("amountTransfered").getAsDouble();
            MoneyAcount.TransferType transferType = stringToTransferType(requestData.get("transferType").getAsString());
            User user = SystemManager.getInstance().getUsers().get(userName);
            user.addTransaction(amountTransfered, transferType, new Date(Instant.now().toEpochMilli()));
            wasTransactionAdded=true;
            response.getWriter().append(gson.toJson(user.getAcount().getBalance()));
        }
       catch (Exception e){
           response.getWriter().append(gson.toJson(wasTransactionAdded));
           response.getWriter().append(gson.toJson(e.getCause()));
        }
    }

    private MoneyAcount.TransferType stringToTransferType(String transferType) {
        if(transferType.equals("Deposit") ||transferType.equals("deposit") )
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


