<?php

namespace Database\Seeders;

use App\Models\Item;
use DateTime;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user')->insert(
            [
                'name' => 'admin',
                'email' => 'admin@localhost',
                'password' => Hash::make('admin'),
                'created_at' => new DateTime(),
                'updated_at' => new DateTime(),
            ]
        );

        DB::table('category')->insert(
            [
                ['name' => 'inne'],
                ['name' => 'opakowania'],
                ['name' => 'narzędzia'],
                ['name' => 'elektronika'],
                ['name' => 'sprzęt biurowy'],
                ['name' => 'kontrabanda']
            ]
        );

        DB::table('source')->insert(
            [
                ['name' => 'JANUSZEX SP. Z.O.O.'],
                ['name' => 'PETERKOVIC STUDIOS'],
                ['name' => 'M&M GROUP'],
                ['name' => 'BROWAR MOCNY FULL'],
                ['name' => 'POLSKIE KOLEJE POWOLNE'],
                ['name' => 'WARZYWNIAK `U SŁAWKA`'],
                ['name' => 'KLUB FANÓW PRL']
            ]
        );

        DB::table('item')->insert(
            [
                [
                    'name' => 'Wiosło',
                    'price' => 99.99,
                    'amount' => 2,
                    'state' => Item::STATE_OK,
                    'description' => 'Nadaje się do wiosłowania',
                    'source' => 4,
                    'category' => 3,
                    'last_edit_by' => 1,
                    'created_at' => new DateTime(),
                    'updated_at' => new DateTime(),
                ],
                [
                    'name' => 'Wiertarka',
                    'price' => 2000,
                    'amount' => 1,
                    'state' => Item::STATE_BORROWED,
                    'description' => 'Sławek pożyczył i jeszcze nie oddał',
                    'source' => 1,
                    'category' => 3,
                    'last_edit_by' => 1,
                    'created_at' => new DateTime(),
                    'updated_at' => new DateTime(),
                ],
                [
                    'name' => 'Połamany kij',
                    'price' => 5,
                    'amount' => 5,
                    'state' => Item::STATE_BROKEN,
                    'description' => 'Leży i się kurzy, może należy się tego pozbyć?',
                    'source' => 1,
                    'category' => 1,
                    'last_edit_by' => 1,
                    'created_at' => new DateTime(),
                    'updated_at' => new DateTime(),
                ],
                [
                    'name' => 'Edycja kolekcjonerska Sołtys Racing',
                    'price' => 240,
                    'amount' => 1,
                    'state' => Item::STATE_BORROWED,
                    'description' => 'Nie na sprzedaż.',
                    'source' => 2,
                    'category' => 1,
                    'last_edit_by' => 1,
                    'created_at' => new DateTime(),
                    'updated_at' => new DateTime(),
                ],
                [
                    'name' => 'Żarowka',
                    'price' => 0.50,
                    'amount' => 5,
                    'state' => Item::STATE_BROKEN,
                    'description' => 'Niestety już nie świeci',
                    'source' => 4,
                    'category' => 4,
                    'last_edit_by' => 1,
                    'created_at' => new DateTime(),
                    'updated_at' => new DateTime(),
                ],
                [
                    'name' => 'Tory',
                    'price' => 75,
                    'amount' => 38,
                    'state' => Item::STATE_BROKEN,
                    'description' => 'Tak samo złe jak podwozie',
                    'source' => 4,
                    'category' => 1,
                    'last_edit_by' => 1,
                    'created_at' => new DateTime(),
                    'updated_at' => new DateTime(),
                ],
                [
                    'name' => 'Bon 500+',
                    'price' => 500,
                    'amount' => 10,
                    'state' => Item::STATE_OK,
                    'description' => 'Uwaga na inflację',
                    'source' => 7,
                    'category' => 6,
                    'last_edit_by' => 1,
                    'created_at' => new DateTime(),
                    'updated_at' => new DateTime(),
                ],
                [
                    'name' => 'Opakowanie szkarłatnych M&M`sów',
                    'price' => 10000,
                    'amount' => 1,
                    'state' => Item::STATE_OK,
                    'description' => 'Oficjalnie nie istnieje',
                    'source' => 3,
                    'category' => 6,
                    'last_edit_by' => 1,
                    'created_at' => new DateTime(),
                    'updated_at' => new DateTime(),
                ]
            ]
        );
    }
}
