package SDMModel;


import java.util.Date;
import java.util.List;

public class MoneyAcount {

    public MoneyAcount() {
        balance = 0;
    }


    private double balance;

    public double getBalance() {
        return balance;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    private List<Transaction> transactions;
    public synchronized void  addTransaction(double amountTransfered, TransferType transferType, Date date){
        Transaction newTransaction = new Transaction( amountTransfered,  transferType, date,this.balance);
        balance = newTransaction.balanceAfter;
        transactions.add(newTransaction);

    }


    public enum TransferType{
        Deposite, Purchase, Sell
    }



    public class Transaction {

        private TransferType transferType;
        private Date transactionDate;
        private double balanceBefore;
        private double balanceAfter;
        private double amountTransfered;

        public Transaction(double amountTransfered, TransferType transferType, Date date, double balance) {
            this.transferType = transferType;
            this.transactionDate = date;
            this.balanceBefore = balance;
            this.amountTransfered = amountTransfered;
            this.balanceAfter = (transferType==TransferType.Deposite || transferType==TransferType.Sell) ? (balance + amountTransfered)
            : balance - amountTransfered;
        }

    }
}

