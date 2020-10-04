package examples.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import SDMModel.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;



@WebServlet(name = "RegisterServlet", urlPatterns = "/register")
public class RegisterServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */

    public void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String rawRequestData = request.getReader().lines().collect(Collectors.joining());
        Gson gson = new Gson();
        JsonObject requestData = new Gson().fromJson(rawRequestData, JsonObject.class);
        //SystemManager systemManager = SystemManager.getInstance();

        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        String role = requestData.get("role").getAsJsonObject().get("value").getAsString();
        String name = requestData.get("name").getAsJsonObject().get("value").getAsString();
        SystemManager.userType userType =  role.equals("Customer") ? SystemManager.userType.Customer : SystemManager.userType.Seller; ;
        Boolean wasUserAdded = SystemManager.getInstance().addUser(name, userType);
        response.getWriter().append(gson.toJson(wasUserAdded));

    }

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int x=0;
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        int x=0;
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }
}


