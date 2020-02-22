<?php

namespace Src\Domain\User\Repository;

use Src\Domain\User\Data\UserData;
use PDO;

class UserLikerRepository
{
  private $connection;

  public function __construct(PDO $connection) {
    $this->connection = $connection;
  }

    public function addLike(UserData $user, $id) {
      $login = $user->login;
      $row = [
        'login' => $login
      ];
      $sql = "SELECT id FROM users WHERE
      login=:login;";
      $idToLike = $this->connection->prepare($sql);
      $idToLike->execute($row);
      $idToLike = $idToLike->fetch(PDO::FETCH_ASSOC);
      $idToLike = $idToLike['id'];

      $sql_from = "SELECT login FROM users WHERE
      id = '$id'";
      $from = $this->connection->query($sql_from)->fetch(PDO::FETCH_ASSOC);
      $from_login = $from['login'];

      $row = [
        'liker' => $id,
        'liked' => $idToLike
      ];
      $sql = "SELECT * FROM likes WHERE
      liker=:liker
      AND
      liked=:liked;";
      $ret = $this->connection->prepare($sql);
      $ret->execute($row);

      if ($ret = $ret->fetch(PDO::FETCH_ASSOC)) {
        $sql = "DELETE FROM likes WHERE
        liker=:liker
        AND
        liked=:liked;";
        $this->connection->prepare($sql)->execute($row);

        $result = [
          'status' => 1,
          'success' => 'Unliked.'
        ];

        $sql_notif = "INSERT INTO notif SET
        sender = '$from_login',
        msg = \"$from_login ne s'interesse plus à vous.\",
        receiver = '$user->login'";
      }
      else {
        $sql = "UPDATE users SET
        score = score - 2
        WHERE
        id = '$id'
        AND
        score > 1";
        $this->connection->query($sql);

        $sql = "INSERT INTO likes SET
        liker=:liker,
        liked=:liked;";
        $result = [
          'status' => 1,
          'success' => 'liked'
        ];
        $liked = 1;

        $sql_notif = "INSERT INTO notif SET
        sender = '$from_login',
        msg = \"$from_login vous a aimé.\",
        receiver = '$user->login'";
      }
      $this->connection->prepare($sql)->execute($row);

      if ($liked) {
        $sql = "SELECT score FROM users WHERE
        id = '$id'";
        $ret = $this->connection->query($sql)->fetch(PDO::FETCH_ASSOC);

        if ((int)$ret['score'] < 94)
          $increase = 7;
        else if ((int)$ret['score'] <= 100){
          $increase = 100 - (int)$ret['score'];
        }
        else if ((int)$ret['score'] < 100)
          $increase = 0;
        $sql = "UPDATE users SET
        score = score + '$increase'
        WHERE
        id = '$id'";
        $this->connection->query($sql);

        $sql = "SELECT score FROM users WHERE
        id = '$idToLike'";
        $ret = $this->connection->query($sql)->fetch(PDO::FETCH_ASSOC);

        if ((int)$ret['score'] < 94)
          $increase = 7;
        else if ((int)$ret['score'] <= 100){
          $increase = 100 - (int)$ret['score'];
        }
        else if ((int)$ret['score'] < 100)
          $increase = 0;
        $sql = "UPDATE users SET
        score = score + '$increase'
        WHERE
        id = '$idToLike'";
        $this->connection->query($sql);

        $row = [
          'liked' => $id,
          'liker' => $idToLike
        ];
        $sql = "SELECT * FROM likes WHERE
        liked=:liked
        AND
        liker=:liker;";
        $ret = $this->connection->prepare($sql);
        $ret->execute($row);

        if ($ret->fetch(PDO::FETCH_ASSOC)) {
            $result = [
              'status' => 1,
              'success' => 'MATCH'
            ];

            $sql_notif = "INSERT INTO notif SET
            sender = '$from_login',
            msg = \"Vous venez de MATCH avec $from_login.\",
            receiver = '$user->login'";

        }
      }
      $this->connection->query($sql_notif);
      return $result;
    }
}
