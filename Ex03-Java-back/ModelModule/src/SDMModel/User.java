package SDMModel;

import java.awt.*;
import java.util.Date;
import java.util.HashMap;


public class User {

    public User() {
        acount = new MoneyAcount();
    }

    public User(String name, Integer Id) {
        this.name = name;
        this.id = Id;
        acount = new MoneyAcount();

    }



    public enum InfoOptions {
        Name, CustomerId, Location;

        public String getInfo(User customer) {
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

    public MoneyAcount getAcount() {
        return acount;
    }

    public boolean isSeller() {
        return isSeller;
    }

    public void setSeller(boolean seller) {
        isSeller = seller;
    }

    private boolean isSeller;
    private MoneyAcount acount;
    private String name;
    private Point location;
    private int id;

    public HashMap<Integer, Order> getOrders() {
        return orders;
    }

    private transient HashMap<Integer, Order> orders = new HashMap<>();

    public synchronized void  addTransaction(double amountTransfered, MoneyAcount.TransferType transferType, Date date){
        acount.addTransaction(amountTransfered, transferType, date);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Point getLocation() {
        return location;
    }
    public String showLocation() {
        return String.format("(%s, %s)", location.x, location.y);
    }

    public void setLocation(Point location) {
        this.location = location;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


}

