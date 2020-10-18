package examples.servlets;

import java.io.*;
import java.util.Collection;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import SDMGenerated.SuperDuperMarketDescriptor;
import SDMModel.SuperMarket;
import SDMModel.SystemManager;
import SDMModel.User;
import SDMModel.XmlUtilities;
import com.google.gson.Gson;

@MultipartConfig
@WebServlet(name = "ReadXMLServlet", urlPatterns = {"/readxml"})
public class    XmlUploadServlet extends HttpServlet {

    //private final static String XML_PATH = "/resources/world.xml";

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        Gson gson = new Gson();
        SuperDuperMarketDescriptor superMarketSDM = null;
        XmlUtilities xmlUtilities = new XmlUtilities();
        String userName = (String) request.getSession().getAttribute("userName");
        User user = SystemManager.getInstance().getUsers().get(userName);
        Collection<Part> parts = request.getParts();
        response.setContentType("text/html;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

        for (Part part : parts) {
            xmlUtilities.isNameOfFileCorrect(part.getName());
            superMarketSDM = xmlUtilities.xmlCheckFromServlet(part.getInputStream());
            xmlUtilities.checkIfTheXmlThatJustLoadedOk(superMarketSDM);
            if (xmlUtilities.getIsXmlOk()) {
                SuperMarket superMarket = SuperMarket.creatInstance(superMarketSDM, user);
                SystemManager.getInstance().setSuperMarket(userName, superMarket);

                String message = "XML file was loaded correctly";

                response.getWriter().append(gson.toJson(message));
            } else {
                xmlUtilities.getWhatWrongMessage();
                response.getWriter().append(gson.toJson(xmlUtilities.getWhatWrongMessage()));
                //return false;
            }
        }

    }





    private String extractFileName(Part part) {
        String contentDisp = part.getHeader("content-disposition");
        String[] items = contentDisp.split(";");
        for (String s : items) {
            if (s.trim().startsWith("filename")) {
                return s.substring(s.indexOf("=") + 2, s.length()-1);
            }
        }
        return "";
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
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
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
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
    }// </editor-fold>

}

