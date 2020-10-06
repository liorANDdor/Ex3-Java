package SDMModel;

import java.awt.*;
import java.util.HashMap;


public class User {

    public User() {
    }

    public User(String name, Integer Id) {
        this.name = name;
        this.id = Id;

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

    private String name;
    private Point location;
    private int id;




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

