<?php

namespace App\Http\Controllers;

use App\Models\Transacao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Routing\Controller as BaseController;

class TransacaoController extends BaseController
{
    /**
     * Construtor para aplicar o middleware de autenticação.
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Lista todas as transações do usuário autenticado.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            // Obter o usuário autenticado
            $user = Auth::user();

            // Buscar transações pertencentes ao usuário
            $transacoes = Transacao::where('user_id', $user->id)->get();

            return response()->json($transacoes, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao listar transações',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cria uma nova transação para o usuário autenticado.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            // Obter o usuário autenticado
            $user = Auth::user();

            $validatedData = $request->validate([
                'tipo' => 'required|in:Entrada,Saída',
                'descricao' => 'required|string|max:255',
                'valor' => 'required|numeric',
                'data' => 'required|date',
            ]);

            $validatedData['user_id'] = $user->id;

            $transacao = Transacao::create($validatedData);

            return response()->json($transacao, 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao criar transação',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Exibe uma transação específica do usuário autenticado.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $user = Auth::user();

            $transacao = Transacao::where('id', $id)
                ->where('user_id', $user->id)
                ->firstOrFail();

            return response()->json($transacao, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Transação não encontrada'
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao obter transação',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Atualiza uma transação existente do usuário autenticado.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();

            $transacao = Transacao::where('id', $id)
                ->where('user_id', $user->id)
                ->firstOrFail();

            $validatedData = $request->validate([
                'tipo' => 'required|in:Entrada,Saída',
                'descricao' => 'required|string|max:255',
                'valor' => 'required|numeric',
                'data' => 'required|date',
            ]);

            $transacao->update($validatedData);

            return response()->json($transacao, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Transação não encontrada'
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao atualizar transação',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove uma transação do usuário autenticado.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $user = Auth::user();

            $transacao = Transacao::where('id', $id)
                ->where('user_id', $user->id)
                ->firstOrFail();

            $transacao->delete();

            return response()->json([
                'message' => 'Transação excluída com sucesso'
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Transação não encontrada'
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao excluir transação',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Retorna o resumo financeiro do usuário autenticado.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function resumo()
    {
        try {
            $user = Auth::user();

            $entradas = Transacao::where('user_id', $user->id)
                ->where('tipo', 'Entrada')
                ->sum('valor');

            $saidas = Transacao::where('user_id', $user->id)
                ->where('tipo', 'Saída')
                ->sum('valor');

            $saldo = $entradas - $saidas;

            return response()->json([
                'entradas' => $entradas,
                'saidas' => $saidas,
                'saldo' => $saldo,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao obter resumo financeiro',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
