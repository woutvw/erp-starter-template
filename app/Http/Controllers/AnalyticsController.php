<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    private static function calculateTrend(float $old, float $new): float
    {
        if(!$new) return 0;
        if(!$old) return 100;

        if ($old < $new) return round((($new / $old) - 1) * 100);
        else return -round((1 - ($new / $old)) * 100);
    }

    private static function trendResponse($total, float $trend, array $chartData): JsonResponse
    {
        return response()->json([
            'total' => $total,
            'trend' => $trend,
            'chart_data' => $chartData
        ]);
    }

    public function newClients()
    {
        $newClientsYTD = Client::where('created_at', '>=', Carbon::parse('-1 year'))->count();
        $newClientsYTDPrevYear = Client::where('created_at', '>=', Carbon::parse('-2 year'))->where('created_at', '<', Carbon::parse('-1 year'))->count();
        $trend = self::calculateTrend($newClientsYTDPrevYear, $newClientsYTD);

        $newClients = Client::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->where('created_at', '>', Carbon::parse('-1 year'))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month')
            ->get()
            ->pluck('total', 'month')
            ->toArray();

        $chartData = [];

        $currentYear = Carbon::now()->year;
        $start = Carbon::now()->subYear()->startOfMonth();

        for ($i = 0; $i < 12; $i++) {
            $pointer = $start->copy()->addMonths($i);
            $month = $pointer->translatedFormat('F');
            if ($pointer->year !== $currentYear) $month .= ' ' . $pointer->year;

            $chartData[] = [
                'month' => $month,
                'value' => isset($newClients[$pointer->month]) ? $newClients[$pointer->month] : 0
            ];
        }

        return self::trendResponse($newClientsYTD, $trend, $chartData);
    }

    public function returningClients()
    {
        return self::trendResponse(0, 0, []);
    }

    public function orders()
    {
        $ordersYTD = Order::where('created_at', '>=', Carbon::parse('-1 year'))->count();
        $ordersYTDPrevYear = Order::where('created_at', '>=', Carbon::parse('-2 year'))->where('created_at', '<', Carbon::parse('-1 year'))->count();
        $trend = self::calculateTrend($ordersYTDPrevYear, $ordersYTD);

        $orders = Order::selectRaw('MONTH(created_at) as month, COUNT(*) as total')
            ->where('created_at', '>', Carbon::parse('-1 year'))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month')
            ->get()
            ->pluck('total', 'month')
            ->toArray();

        $chartData = [];

        $currentYear = Carbon::now()->year;
        $start = Carbon::now()->subYear()->startOfMonth();

        for ($i = 0; $i < 12; $i++) {
            $pointer = $start->copy()->addMonths($i);
            $month = $pointer->translatedFormat('F');
            if ($pointer->year !== $currentYear) $month .= ' ' . $pointer->year;

            $chartData[] = [
                'month' => $month,
                'value' => isset($orders[$pointer->month]) ? $orders[$pointer->month] : 0
            ];
        }

        return self::trendResponse($ordersYTD, $trend, $chartData);
    }

    public function revenue()
    {
        $revenueYTD = Order::where('created_at', '>=', Carbon::parse('-1 year'))->sum('total_price');
        $revenueYTDPrevYear = Order::where('created_at', '>=', Carbon::parse('-2 year'))->where('created_at', '<', Carbon::parse('-1 year'))->sum('total_price');
        $trend = self::calculateTrend($revenueYTDPrevYear, $revenueYTD);

        $orders = Order::selectRaw('MONTH(created_at) as month, SUM(total_price) as total')
            ->where('created_at', '>', Carbon::parse('-1 year'))
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->orderBy('month')
            ->get()
            ->pluck('total', 'month')
            ->toArray();

        $chartData = [];

        $currentYear = Carbon::now()->year;
        $start = Carbon::now()->subYear()->startOfMonth();

        for ($i = 0; $i < 12; $i++) {
            $pointer = $start->copy()->addMonths($i);
            $month = $pointer->translatedFormat('F');
            if ($pointer->year !== $currentYear) $month .= ' ' . $pointer->year;

            $chartData[] = [
                'month' => $month,
                'value' => isset($orders[$pointer->month]) ? $orders[$pointer->month] : 0
            ];
        }

        return self::trendResponse('€'.round($revenueYTD, 2), $trend, $chartData);
    }
}
