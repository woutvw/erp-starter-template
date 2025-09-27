<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    private static function calculateTrend(float $old, float $new): float
    {
        if ($old < $new) return round((($new / $old) - 1) * 100);
        else return -round((1 - ($new / $old)) * 100);
    }

    public function newClients()
    {
        $total = Client::count();

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

        return response()->json([
            'total' => $total,
            'trend' => $trend,
            'chart_data' => $chartData
        ]);
    }
}
