package SDMModel;

import java.awt.*;
import java.util.HashMap;


public class Seller extends User {

    public Seller() {
    }

    public Seller(String name, Integer customerId) {
        super(name, customerId);

    }



    public enum InfoOptions {
        Name, CustomerId, Location;

        public String getInfo(Seller customer) {
            switch (this) {
                case CustomerId:
                    return String.valueOf(customer.getId());
                case Name:
                    return customer.getName();
                case Location:
                    return customer.showLocation();

                default:
                    return "Unknown";
            }
        }


    }




    private double totalShipmentPrice = 0.0;
    private double totalItemPrice = 0.0;



    public double getTotalShipmentPrice() {
        return totalShipmentPrice;
    }

    public double getTotalItemPrice() {
        return totalItemPrice;
    }

    public void addTotalShipmentPrice(double shipmentPrice) {
        this.totalShipmentPrice =  this.totalShipmentPrice + shipmentPrice;
    }

    public void addTotalItemPrice(double itemsPrice) {
        this.totalItemPrice = this.totalItemPrice + itemsPrice;
    }

    private HashMap<Integer, Order> orders = new HashMap<>();






}

