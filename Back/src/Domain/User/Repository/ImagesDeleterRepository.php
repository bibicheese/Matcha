<?php

namespace Src\Domain\User\Repository;

use PDO;

class ImagesDeleterRepository
{
    private $connection;

    public function __construct(PDO $connection) {
      $this->connection = $connection;
    }

    public function delete($images, $id) {
      if (! $images)
        return ['status' => 0, 'error' => 'no images sent'];
      foreach ($images as $key => $value) {
        $sql = "DELETE FROM images WHERE
        link = '$value'
        AND
        userid = '$id'";
        $this->connection->query($sql);
        if (unlink($value))
          return "yes";
      }
      return ['status' => 1, 'success' => 'images deleted'];
    }
}