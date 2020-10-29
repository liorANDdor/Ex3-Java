package examples.servlets;


import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
@ServerEndpoint("/saveSocket")
public class webSocketServlet {

    public static HashMap<String ,Session> sessionsToUser = new HashMap<>();
    public Session session;
    @OnOpen
    public void onOpen(Session session) {

        this.session = session;

    }

    @OnClose
    public void onClose(Session session) {
        Map.Entry<String, Session> pair =
                sessionsToUser
                        .entrySet()
                        .stream()
                        .filter((ent) -> ent.getValue().getId() == session.getId())
                        .findFirst()
                        .get();
        sessionsToUser.remove(pair.getKey());
    }

    @OnMessage
    public void onMessasge(String message, Session session) {
        if(message.substring(0, 4).equals("User"))
            sessionsToUser.put(message.substring(5), this.session);

    }

    @OnError
    public void onError(Throwable t) {
    }

    public static void broadcast(String userName, String msg) {
        if (sessionsToUser.containsKey(userName)) {
            try {
                sessionsToUser.get(userName).getBasicRemote().sendText(msg);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }





}