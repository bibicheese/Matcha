<?php
namespace Src\Notif;

use Slim\Http\Response;
use Slim\Http\ServerRequest;
use Src\Domain\User\Data\UserAuth;
use Src\Domain\User\Repository\checkUserLoggedRepository;
use PDO;

final class GetNotif
{
    private $connection;
    private $checkAuth;
    
    public function __construct(PDO $connection, checkUserLoggedRepository $checkAuth) {
        $this->connection = $connection;
        $this->checkAuth = $checkAuth;
    }

    public function __invoke(ServerRequest $request, Response $response): Response {
      $data = $request->getParsedBody();
      $id = $data['id'];
        
      $userAuth = new UserAuth();
      $userAuth->id = $data['id'];
      $userAuth->token = $data['token'];
      
      if ($status = $this->checkAuth->check($userAuth))
        $result = ['status' => 0, 'error' => $status];
      else {
        $ret = $this->connection->query("SELECT login FROM users WHERE id = '$id'")->fetch(PDO::FETCH_ASSOC);

        $receiver = $ret['login'];
        
        $sql = "SELECT * FROM notif WHERE
        receiver=:receiver;";
        
        $row = [
          'receiver' => $receiver
        ];
        
        $ret = $this->connection->prepare($sql);
        $ret->execute($row);
        $ret = $ret->fetchAll(PDO::FETCH_ASSOC);
        
        $result = ['status' => 1, 'success' => $ret];
      }
      
      return $response->withJson($result);
    }
}