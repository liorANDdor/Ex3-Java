package SDMModel;


import javafx.beans.property.SimpleBooleanProperty;

import java.awt.*;
import java.time.Instant;
import java.util.*;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;

public class SystemManager {


    public enum optionsForUpdate {
        DeleteItem("Delete Item"),
        ChangePriceOfItem("Change Price Of Item"),
        AddNewItem("Add New Item");

        private String label;

        optionsForUpdate(String label) {
            this.label = label;
        }

        public String toString() {
            return label;
        }
    }

    public enum optionsForSale {
        OneOf("ONE-OF"),
        AllOrNothing("ALL-OR-NOTHING");


        private String label;

        optionsForSale(String label) {
            this.label = label;
        }

        public String toString() {
            return label;
        }
    }

    public enum userType {
        Customer,
        Seller
    }

    private static SystemManager manager = null;
    private SuperMarket superMarket;

    public Integer getNumberOfUsers() {
        return numberOfUsers;
    }

    private Integer numberOfUsers = 0;

    public SuperMarket getSuperMarketByLocation(String zone) {
        SuperMarket superMarketSpecificZone = null;
        for (List<SuperMarket> superMarketList : superMarkets.values())
            for (SuperMarket sdm : superMarketList)
                if (sdm.getZone().equals(zone))
                    superMarketSpecificZone = sdm;

        return superMarketSpecificZone;
    }

    public HashMap<String, List<SuperMarket>> getSuperMarkets() {
        return superMarkets;
    }

    private HashMap<String, List<SuperMarket>> superMarkets = new HashMap<>();

    public HashMap<String, User> getUsers() {
        return users;
    }

    private HashMap<String, User> users = new HashMap<>();

    private static Object createManagerInstance = new Object();

    private SimpleBooleanProperty thereIsXmlLoaded = new SimpleBooleanProperty(false);

    public String getOwnerOfZone(String zone) {
        for (Map.Entry<String, List<SuperMarket>> entry : superMarkets.entrySet()) {
            if (entry.getValue().stream().anyMatch(sdm -> sdm.getZone().equals(zone)))
                return entry.getKey();
        }
        return "Didnt Find Zone Owner";
    }

    public List<Item> getItemsThatCanBeDeleted(Store store) {
        List<Item> lst = this.getSuperMarket().getItems().values().stream()
                .filter(item -> store.getItemsToSell()
                        .stream()
                        .anyMatch(el -> el.getItemId() == item.getId()))
                .collect(Collectors.toList());

        if (lst.size() <= 1)
            return null;
        List<Store> listOfOtherStores = this.superMarket
                .getStores()
                .values()
                .stream()
                .filter(store1 -> store.getId() != store1.getId())
                .collect(Collectors.toList());
        List<Item> lstOfReleventITems = lst
                .stream()
                .filter(item -> listOfOtherStores
                        .stream()
                        .anyMatch(store1 -> store1.getItemsToSell()
                                .stream()
                                .anyMatch(sell -> sell.getItemId() == item.getId())))
                .collect(Collectors.toList());
        return lstOfReleventITems;
    }

    public int getMaxRows() {
        int maxRowStores = superMarket.getStores()
                .values()
                .stream()
                .mapToInt(store -> (int) store.getLocation().getX())
                .max()
                .orElseThrow(NoSuchElementException::new);
        int maxRowCustomers = superMarket
                .getCostumers()
                .values()
                .stream()
                .mapToInt(store -> (int) store.getLocation().getX())
                .max()
                .orElseThrow(NoSuchElementException::new);
        return Math.max(maxRowCustomers, maxRowStores);
    }

    public int getMaxCols() {
        int maxColStores = superMarket
                .getStores()
                .values()
                .stream()
                .mapToInt(store -> (int) store.getLocation().getY())
                .max()
                .orElseThrow(NoSuchElementException::new);

        int maxColsCustomers = superMarket
                .getCostumers()
                .values()
                .stream()
                .mapToInt(store -> (int) store.getLocation().getY())
                .max()
                .orElseThrow(NoSuchElementException::new);
        return Math.max(maxColsCustomers, maxColStores);
    }

    public synchronized boolean addUser(String name, SystemManager.userType type) {
        if (checkIfUserExist(name)) {
            return false;
        } else {
            User newUser;

            Integer userNumber = this.getNumberOfUsers() + 1;
            this.increaseNumberOfUsers();
            if (type == userType.Customer) {
                newUser = new Customer(name, userNumber);
                newUser.setSeller(false);
            }
            else {
                newUser = new Seller(name, userNumber);
                newUser.setSeller(true);

            }

            users.put(name, newUser);
            return true;
        }
    }

    private synchronized boolean checkIfUserExist(String name) {
        return users.containsKey(name) ? true : false;
    }


    public void increaseNumberOfUsers() {
        this.numberOfUsers += 1;
    }

    public static List<Sale> changeValueOfItem(Store store, Item item, optionsForUpdate whatToDo, double price) {
        List<Sale> saleDeletedWhatYouBuy = new ArrayList();
        List<Sale> saleDeletedWhatYouGet = new ArrayList();
        List<Sale> finalListOfSaleDeleted = new ArrayList();
        switch (whatToDo) {
            case ChangePriceOfItem:
                Sell sell = store.getItemsToSell().stream().filter(el -> el.getItemId() == item.getId()).findFirst().orElse(null);
                if (sell != null)
                    sell.setPrice(price);
                break;
            case DeleteItem:
                saleDeletedWhatYouBuy = store.getSales().stream().filter(sale -> sale.getIfBuy().getItemId() == item.getId())
                        .collect(Collectors.toList());

                saleDeletedWhatYouGet = store.getSales().stream().filter(sale -> sale.getNeedToGet().getOffers().stream().anyMatch(x -> x.getItemId() == item.getId())).collect(Collectors.toList());


                if (saleDeletedWhatYouBuy != null) {
                    store.getSales().removeAll(saleDeletedWhatYouBuy);
                    finalListOfSaleDeleted.addAll(saleDeletedWhatYouBuy);
                }
                if (saleDeletedWhatYouGet != null) {
                    store.getSales().removeAll(saleDeletedWhatYouGet);

                    finalListOfSaleDeleted.addAll(saleDeletedWhatYouGet);
                }
                store.getItemsToSell().removeIf(el -> el.getItemId() == item.getId());
                break;
            case AddNewItem:
                Sell newSell = new Sell();
                newSell.setPrice(price);
                newSell.setItemId(item.getId());
                store.getItemsToSell().add(newSell);
                break;
        }
        return finalListOfSaleDeleted;
    }

    public static void addSale(Sale sale) {
        sale.getStoreOfferSale().getSales().add(sale);
    }


    public SuperMarket getSuperMarket() {
        return superMarket;
    }


    private SystemManager() {

    }

    public void setSuperMarket(String userName, SuperMarket SDM) {
        if (superMarkets.containsKey(userName))
            superMarkets.get(userName).add(SDM);
        else {
            ArrayList<SuperMarket> newList = new ArrayList<>();
            newList.add(SDM);
            superMarkets.put(userName, newList);
        }
    }

    public static SystemManager getInstance() {
        if (manager == null)
            synchronized (createManagerInstance) {
                if (manager == null)
                    manager = new SystemManager();
            }

        return manager;
    }


    public SimpleBooleanProperty isXmlLoaded() {
        return thereIsXmlLoaded;
    }

    public StringBuilder getinfoItem(Item item, List<Item.InfoOptions> list) {
        StringBuilder itemInfo = new StringBuilder();
        for (Item.InfoOptions option : list) {
            itemInfo
                    .append(String.join(" ", option.toString().split("(?=[A-Z])")))
                    .append(": ").append(option.getInfo(item))
                    .append("\n");
        }

        return itemInfo;
    }

    public StringBuilder getinfoOrder(Order item, List<Order.InfoOptions> list) {
        StringBuilder itemInfo = new StringBuilder();
        for (Order.InfoOptions option : list) {
            itemInfo
                    .append(String.join(" ", option.toString().split("(?=[A-Z])")))
                    .append(": ").append(option.getInfo(item))
                    .append("\n");
        }

        return itemInfo;
    }

    public StringBuilder getInfoSell(Sell sell, List<Sell.InfoOptions> list) {
        StringBuilder sellInfo = new StringBuilder();
        for (Sell.InfoOptions option : list) {
            sellInfo
                    .append(String.join(" ", option.toString().split("(?=[A-Z])")))
                    .append(": ").append(option.getInfo(sell))
                    .append("\n");
        }
        return sellInfo;
    }

    public StringBuilder getStoreInfo(Store store, List<Store.InfoOptions> list) {
        StringBuilder storeInfo = new StringBuilder();
        for (Store.InfoOptions option : list) {
            storeInfo
                    .append(String.join(" ", option.toString().split("(?=[A-Z])")))
                    .append(": ").append(option.getInfo(store))
                    .append("\n");
        }
        return storeInfo;
    }

    public StringBuilder getCustomerInfo(Customer customer, List<Customer.InfoOptions> list) {
        StringBuilder customerInfo = new StringBuilder();
        for (Customer.InfoOptions option : list) {
            customerInfo
                    .append(String.join(" ", option.toString().split("(?=[A-Z])")))
                    .append(": ").append(option.getInfo(customer))
                    .append("\n");
        }
        return customerInfo;
    }

    public Order getEmptyOrder() {
        Order order = new Order();
        return order;
    }

    public boolean checkIfStoreOk(SuperMarket sdm, Store newStore, StringBuilder whatWrongMessage) {
        boolean isContentAsNeeded = true;
        HashMap<Integer, Store> stores = sdm.getStores();
        HashMap<Integer, Customer> customers = sdm.getCostumers();
        for (Store store : stores.values()) {
            if (store.getId() == newStore.getId()) {
                isContentAsNeeded = false;
                whatWrongMessage.append(String.format("There are two stores with the same ID : %d \n", newStore.getId()));
            }
        }
        for (Store store : stores.values()) {
            if (store.getLocation() == newStore.getLocation()) {
                isContentAsNeeded = false;
                whatWrongMessage.append(String.format("There are two stores with the Location "));
            }
        }
        return isContentAsNeeded;

    }

    public String getPriceOfItemByStoreId(Item item, int finalStoreID) {
        Store store = superMarket.getStores().get(finalStoreID);
        Sell sellFound = (Sell) store
                .getItemsToSell()
                .stream()
                .filter(sell -> sell.getItemId() == item.getId())
                .findAny()
                .orElse(null);
        if (sellFound != null)
            return String.valueOf(sellFound.getPrice());
        else
            return "No Price (not for sale)";
    }

    public void commitOrder(SuperMarket superMarket, Order order) {
        order.getStoresToOrderFrom().keySet().stream().forEach(store -> store.getOrders().remove(null));
        Integer orderNumber = superMarket.getNumberOfOrders() + 1;
        superMarket.increaseOrderNumber();
        order.setOrderNumber(orderNumber);
        order.calculatAndSetDistance();
        superMarket.addOrder(order);
        for (Item itemFromXml : order.getItemsQuantity().keySet()) {
            Item item = superMarket.getItemByID(itemFromXml.getId());
            item.increaseNumberOfTimesItemWasSold(order.getItemsQuantity().get(item));
        }
        for (Integer storeId : order.getSalesByStoreId().keySet()) {
            for (Offer offer : order.getSalesByStoreId().get(storeId)) {
                Item item = superMarket.getItemByID(offer.getItemId());
                item.increaseNumberOfTimesItemWasSold(offer.getQuantity());
            }
        }
        for (Map.Entry<Store, List<Sell>> entry : order.getStoresToOrderFrom().entrySet()) {
            Store store = superMarket.getStores().get(entry.getKey().getId());
            Order.crateSubOrder(store, order, superMarket.getItems().values());
        }
        order.getOrderCustomer().addTotalItemPrice(order.getItemsPrice());
        order.getOrderCustomer().addTotalShipmentPrice(order.getShipmentPrice());
        order.getOrderCustomer().increaseNumberOfOrders();


    }

    public void addAnItemToOrder(SuperMarket superMarket, Order order, HashMap<Integer, Order> subOrders, Store store, int itemId, double quantity) {
        Item item = superMarket.getItemByID(itemId);
        if (order.getItemsQuantity().containsKey(item)) {
            order.getItemsQuantity().put(item, (order.getItemsQuantity().get(item) + quantity));
        } else {
            if (order.getStoresToOrderFrom().containsKey(store)) {
                order.getStoresToOrderFrom().get(store).add(store.getSellById(itemId));
            } else {
                order.getStoresToOrderFrom().put(store, new ArrayList<Sell>());
                order.getStoresToOrderFrom().get(store).add(store.getSellById(itemId));
            }
            order.getItemsQuantity().put(item, quantity);
        }

        double itemPrice = superMarket.getStores().get(store.getId()).getItemPrice(itemId);
        order.increaseOrderTotalPrice(itemPrice * quantity);
        subOrders.put(store.getId(), addAnItemToSubOrder(superMarket, subOrders.getOrDefault(store.getId(), getEmptyOrder()), store, itemId, quantity));
    }

    public Order addAnItemToSubOrder(SuperMarket superMarket, Order order, Store store, int itemId, double quantity) {
        Item item = superMarket.getItemByID(itemId);
        if (order.getItemsQuantity().containsKey(item)) {
            order.getItemsQuantity().put(item, (order.getItemsQuantity().get(item) + quantity));
        } else {
            if (order.getStoresToOrderFrom().containsKey(store)) {
                order.getStoresToOrderFrom().get(store).add(store.getSellById(itemId));
            } else {
                order.getStoresToOrderFrom().put(store, new ArrayList<Sell>());
                order.getStoresToOrderFrom().get(store).add(store.getSellById(itemId));
            }
            order.getItemsQuantity().put(item, quantity);
        }

        double itemPrice = superMarket.getStores().get(store.getId()).getItemPrice(itemId);
        order.increaseOrderTotalPrice(itemPrice * quantity);
        store.getOrders().put(order.getOrderNumber(), order);
        return order;
    }

    public Store getItemLowestPrice(SuperMarket superMarket, int itemId) {
        Double itemLowstPrice = Double.POSITIVE_INFINITY;
        Store storeLowestItemPrice = null;
        for (Store store : superMarket.getStores().values()) {
            if (store.isItemSold(itemId))
                if (store.getItemPrice(itemId) < itemLowstPrice) {
                    itemLowstPrice = store.getItemPrice(itemId);
                    storeLowestItemPrice = store;
                }
        }
        return storeLowestItemPrice;
    }


}
