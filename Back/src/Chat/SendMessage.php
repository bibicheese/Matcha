<?php
namespace Src\Chat;

use Slim\Http\Response;
use Slim\Http\ServerRequest;
use Src\Domain\User\Data\UserAuth;
use Src\Domain\User\Repository\checkUserLoggedRepository;
use PDO;

final class SendMessage
{
    private $connection;
    private $checkAuth;

    public function __construct(PDO $connection, checkUserLoggedRepository $checkAuth) {
        $this->connection = $connection;
        $this->checkAuth = $checkAuth;
    }

    public function __invoke(ServerRequest $request, Response $response): Response {
      $data = $request->getParsedBody();
      $from = $data['id'];
      $to = $data['to'];
      $msg = $data['msg'];

      $userAuth = new UserAuth();
      $userAuth->id = $data['id'];
      $userAuth->token = $data['token'];

      if ($status = $this->checkAuth->check($userAuth))
        $result = ['status' => 0, 'error' => $status];
      else {
        $ret = $this->connection->query("SELECT login FROM users WHERE id = '$from'")->fetch(PDO::FETCH_ASSOC);

        $sender = $ret['login'];
        $sql = "INSERT INTO chat SET
        sender=:sender,
        msg=:msg,
        receiver=:receiver;";

        $row = [
          'sender' => $sender,
          'msg' => $msg,
          'receiver' => $to
        ];

        $this->connection->prepare($sql)->execute($row);

        $sql = "SELECT * FROM notif WHERE
        sender = '$sender'
        AND
        type = '$message'
        AND
        receiver = '$to'";
        
        $sql = "INSERT INTO notif SET
        sender = '$sender',
        type = 'message',
        receiver = '$to'";
        $this->connection->query($sql);

        $result = ['status' => 1, 'success' => 'message envoyé'];
      }

      return $response->withJson($result);
    }
}
