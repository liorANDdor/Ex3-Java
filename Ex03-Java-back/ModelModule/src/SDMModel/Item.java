package SDMModel;


import SDMGenerated.SDMItem;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Item implements Serializable {
    public Item(String ItemName, int ItemID,PurchaseCategory catagory ){
        this.id = ItemID;
        this.name = ItemName;
        this.purchaseCategory = catagory;
        totalNumberOfTimePurchased = 0;
        storesWhoSellTheItem = new ArrayList<>();

    }
    public Item(){}

    public void setItemAveragePrice(double averagePrice) {
        this.itemAveragePrice=averagePrice;
    }

    public enum InfoOptions {
        Name, ItemId, Category, NumberOfStoresSellTheItem, ItemAveragePrice, NumberOfTimesItemWasSold;

        public String getInfo(Item item) {
            switch (this) {
                case ItemId:
                    return String.valueOf(item.getId());
                case Name:
                    return item.getName();
                case Category:
                    return String.valueOf(item.getPurchaseCategory());
                case NumberOfStoresSellTheItem:
                    return String.valueOf(item.getStoresWhoSellTheItem().size());
                case ItemAveragePrice:
                    return String.valueOf(item.getItemAveragePrice());
                case NumberOfTimesItemWasSold:
                    return String.valueOf(item.getNumberOfTimesItemWasSold());
                default:
                    return "Unknown";
            }
        }
    }

    public enum PurchaseCategory {
        QUANTITY,
        WEIGHT;

        @Override
        public String toString() {
            return name().substring(0,1).toUpperCase() + name().substring(1).toLowerCase();
        }
    }

    public double totalNumberOfTimePurchased = 0;
    public List<Store> storesWhoSellTheItem = new ArrayList<>();
    private String name;
    private PurchaseCategory purchaseCategory; //can be enum
    private int id;
    private double itemAveragePrice;

    public static Item createInstanceBySDM(SDMItem sdmItem, List<Store> stores) {
        Item newItem = new Item();
        newItem.setId(sdmItem.getId());
        newItem.setName(sdmItem.getName());
        newItem.setPurchaseCategory(sdmItem.getPurchaseCategory());
        newItem.setStoresWhoSellTheItem(stores);
        return newItem;
    }

    public double getItemAveragePrice(){ //we can change logic so the average price will be update each time it is ordered
                                        //and then just use a getter
        double sumPriceOfItems = 0;
        int numberOfStoresSellTheItem =  storesWhoSellTheItem.size();
        for (Store store : storesWhoSellTheItem){
            sumPriceOfItems = sumPriceOfItems + store.getItemPrice(id);
        }
        return (double)Math.round(sumPriceOfItems/numberOfStoresSellTheItem * 100d) / 100d;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PurchaseCategory getPurchaseCategory() {
        return purchaseCategory;
    }

    public void setPurchaseCategory(String purchaseCategory) {
        if(purchaseCategory.equals("Quantity"))
            this.purchaseCategory = PurchaseCategory.QUANTITY;
        else if(purchaseCategory.equals("Weight"))
            this.purchaseCategory = PurchaseCategory.WEIGHT;

    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Store> getStoresWhoSellTheItem(){ return storesWhoSellTheItem; }

    public void setStoresWhoSellTheItem(List<Store> stores){ storesWhoSellTheItem=stores; }

    public  double getNumberOfTimesItemWasSold() {
        return totalNumberOfTimePurchased;
    }

    public  void increaseNumberOfTimesItemWasSold(double quantity) {
        totalNumberOfTimePurchased +=quantity;
    }
    @Override
    public int hashCode() {
        return this.getId();
    }

    @Override
    public boolean equals(Object o)
    {
        if(o!=null)
             return o.hashCode()==this.hashCode() ;
        else
            return false;
    }
    @Override
    public String toString(){
        return this.getName();
    }
}
