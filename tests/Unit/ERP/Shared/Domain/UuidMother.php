<?php

declare(strict_types=1);

namespace Tests\Unit\ERP\Shared\Domain;

use Faker\Factory;

final class UuidMother
{

    public static function random(): string
    {
        return Factory::create()->unique()->uuid;
    }
}
