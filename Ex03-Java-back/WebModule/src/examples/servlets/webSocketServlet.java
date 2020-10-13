package examples.servlets;


import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
@ServerEndpoint("/saveSocket")
public class webSocketServlet {

    public static HashMap<String ,webSocketServlet> sessions = new HashMap<>();
    public Session session;
    @OnOpen
    public void onOpen(Session session) {
        sessions.put(session.getId(), this);
        this.session = session;
    }

    @OnClose
    public void onClose(Session session) {
        sessions.remove(session.getId());
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        try {
            session.getBasicRemote().sendText("Hello Client " + session.getId() + "!");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnError
    public void onError(Throwable t) {
    }

    public static void broadcast(String msg){
        sessions.values().forEach(endpoint -> {
            synchronized (endpoint) {
                try {
                    endpoint.session.getBasicRemote().sendText(msg);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }
}