<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

trait ApiResponser
{
    /**
     * Build success response
     *
     * @param     $data
     * @param int $code
     * @return Response
     */
    public function successResponse($data, int $code = Response::HTTP_OK): Response
    {
        return response($data, $code)->header('Content-Type', 'application/json');
    }

    /**
     * @param     $data
     * @param int $code
     * @return JsonResponse
     */
    public function validResponse($data, int $code = Response::HTTP_OK): JsonResponse
    {
        return response()->json(['data' => $data], $code);
    }

    /**
     * @param $message
     * @param $code
     * @return JsonResponse
     */
    public function errorResponse($message, $code): JsonResponse
    {
        return response()->json(['error' => $message, 'code' => $code], $code);
    }

    /**
     * @param $message
     * @param $code
     * @return Response
     */
    public function errorMessage($message, $code): Response
    {
        return response($message, $code)->header('Content-Type', 'application/json');
    }
}
