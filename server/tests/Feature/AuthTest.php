<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_seeded_user_can_login(): void
    {
        $this->seed();

        $response = $this->postJson('/api/login', [
            'email' => 'employee@example.com',
            'password' => 'password',
        ]);

        $response->assertOk();
        $response->assertJsonPath('message', 'Login successful.');
        $response->assertJsonStructure([
            'message',
            'token',
            'user',
        ]);
    }
}