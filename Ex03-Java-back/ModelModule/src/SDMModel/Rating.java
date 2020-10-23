package SDMModel;


import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.OptionalDouble;

public class Rating implements Serializable {


    public Rating() {

    }

    double averageRating;
    private List<Rating.Feedback> feedbacks = new ArrayList<>();
    public void addFeedback(String clientName, Date date, int rating, String comment) {
        Feedback feedback = new Feedback(clientName, date, rating, comment );
        feedbacks.add(feedback);
        calcRating();
    }
    public void addFeedback(String clientName, Date date, int rating) {
        addFeedback(clientName, date, rating, "" );
    }

    private void calcRating() {
        int numOfFeedbacksBeforeLast = feedbacks.size() - 1;
        OptionalDouble average = feedbacks.stream().mapToDouble(a -> a.rating).average();
        averageRating = average.isPresent() ? average.getAsDouble() : 0;
    }


    public class Feedback {


        private Date feedbackDate;
        private String clientName;
        private int rating;
        private String comment;

        public Feedback(String clientName, Date date, int rating, String comment) {
            this.clientName = clientName;
            this.feedbackDate = date;
            this.rating = rating;
            this.comment = comment;
        }


    }
}
