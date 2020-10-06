package SDMModel;


import java.awt.*;
import java.util.HashMap;


public class Customer extends User {

    public Customer() {
        super();
    }

    public Customer(String name, Integer customerId) {
        super(name, customerId);

    }



    public enum InfoOptions {
        Name, CustomerId, Location,AverageShipmentPrice, AverageItemPrice, NumberOfOrders;

        public String getInfo(Customer customer) {
            switch (this) {
                case CustomerId:
                    return String.valueOf(customer.getId());
                case Name:
                    return customer.getName();
                case Location:
                    return customer.showLocation();
                case AverageShipmentPrice:
                    return customer.getAverageShipmentprice(customer);
                case AverageItemPrice:
                    return customer.getAverageItemPrice(customer);
                case NumberOfOrders:
                    return String.valueOf(customer.getNumberOfOrders());
                default:
                    return "Unknown";
            }
        }


    }




    public Integer getNumberOfOrders() {
        return numberOfOrders;
    }

    private Integer numberOfOrders = 0;
    private double totalShipmentPrice = 0.0;
    private double totalItemPrice = 0.0;


    public void increaseNumberOfOrders() {
        numberOfOrders++;
    }

    public String getAverageShipmentprice(Customer customer) {
        if(customer.getNumberOfOrders() == 0)
            return "0.0";
        else
            return String.format("%.2f" ,customer.getTotalShipmentPrice() / customer.getNumberOfOrders());
    }


    public String getAverageItemPrice(Customer customer) {
        if(customer.getNumberOfOrders() == 0)
            return "0.0";
        else
            return String.format("%.2f" ,customer.getTotalItemPrice() / customer.getNumberOfOrders());
    }

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

