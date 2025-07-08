import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  Target,
  MapPin,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Users,
  Calendar,
  Filter,
  Info
} from 'lucide-react';

// Mock data for different analyses
const assortmentData = [
  { brand: 'Greenfields', astro: 85, segari: 72, category: 'Electronics' },
  { brand: 'Ultramilk', astro: 92, segari: 68, category: 'Home & Garden' },
  { brand: 'Diamond', astro: 78, segari: 89, category: 'Fashion' },
  { brand: 'Prochiz', astro: 65, segari: 95, category: 'Sports' },
  { brand: 'Mimi White', astro: 88, segari: 45, category: 'Books' },
];

const categoryGapData = [
  { category: 'Electronics', astro: 95, segari: 45, gap: 50 },
  { category: 'Fashion', astro: 78, segari: 92, gap: -14 },
  { category: 'Home & Garden', astro: 82, segari: 76, gap: 6 },
  { category: 'Sports', astro: 45, segari: 88, gap: -43 },
  { category: 'Books', astro: 67, segari: 34, gap: 33 },
];

const priceComparisonData = [
  { sku: 'SKU001', astroPrice: 125, segariPrice: 118, difference: 7 },
  { sku: 'SKU002', astroPrice: 89, segariPrice: 95, difference: -6 },
  { sku: 'SKU003', astroPrice: 245, segariPrice: 230, difference: 15 },
  { sku: 'SKU004', astroPrice: 67, segariPrice: 72, difference: -5 },
  { sku: 'SKU005', astroPrice: 156, segariPrice: 148, difference: 8 },
];

const topBrandsData = [
  { brand: 'Greenfields', astroSales: 2500000, segariSales: 1800000, alfagiftSales: 1200000, klickIndomaretSales: 1600000, mysuperindoSales: 900000 },
  { brand: 'Ultramilk', astroSales: 3200000, segariSales: 2100000, alfagiftSales: 1800000, klickIndomaretSales: 2200000, mysuperindoSales: 1300000 },
  { brand: 'Diamond', astroSales: 1800000, segariSales: 2200000, alfagiftSales: 1500000, klickIndomaretSales: 1900000, mysuperindoSales: 1100000 },
  { brand: 'Prochiz', astroSales: 1500000, segariSales: 1600000, alfagiftSales: 1300000, klickIndomaretSales: 1400000, mysuperindoSales: 800000 },
  { brand: 'Mimi White', astroSales: 1200000, segariSales: 1400000, alfagiftSales: 1000000, klickIndomaretSales: 1100000, mysuperindoSales: 700000 },
];

const inventoryAreaData = [
  { area: 'Jakarta', inventory: 85, focus: 'High' },
  { area: 'Surabaya', inventory: 72, focus: 'Medium' },
  { area: 'Bandung', inventory: 91, focus: 'High' },
  { area: 'Medan', inventory: 45, focus: 'Low' },
  { area: 'Makassar', inventory: 67, focus: 'Medium' },
];

const promotionData = [
  { area: 'Jakarta', hasPromotion: true, sales: 150000 },
  { area: 'Surabaya', hasPromotion: false, sales: 89000 },
  { area: 'Bandung', hasPromotion: true, sales: 142000 },
  { area: 'Medan', hasPromotion: false, sales: 67000 },
  { area: 'Makassar', hasPromotion: true, sales: 98000 },
];

const salesVelocityData = [
  { month: 'Jan', sales: 120, stock: 450, velocity: 0.27 },
  { month: 'Feb', sales: 135, stock: 420, velocity: 0.32 },
  { month: 'Mar', sales: 148, stock: 380, velocity: 0.39 },
  { month: 'Apr', sales: 162, stock: 340, velocity: 0.48 },
  { month: 'May', sales: 155, stock: 360, velocity: 0.43 },
  { month: 'Jun', sales: 178, stock: 320, velocity: 0.56 },
];

// Updated data based on feedback
const salesChannelData = [
  { name: 'Segari', value: 25, color: '#0088FE' },
  { name: 'Astro', value: 22, color: '#00C49F' },
  { name: 'Klik Indomaret', value: 20, color: '#FFBB28' },
  { name: 'Alfagift', value: 18, color: '#FF8042' },
  { name: 'SuperIndo', value: 15, color: '#8884D8' },
];

const salesCategoryData = [
  { name: 'Susu', value: 65, color: '#0088FE' },
  { name: 'Tisu', value: 35, color: '#00C49F' },
];

// New data for market share by brand in Overview
const marketShareByBrand = [
  { brand: 'Ultra Milk', marketShare: 13.10, color: '#0088FE' },
  { brand: 'Prochiz', marketShare: 9.82, color: '#00C49F' },
  { brand: 'Greenfields', marketShare: 8.58, color: '#FFBB28' },
  { brand: 'Mimi White', marketShare: 5.15, color: '#FF8042' },
  { brand: 'Diamond', marketShare: 4.40, color: '#8884D8' },
];

// New data for sales by area in Overview
const salesByAreaData = [
  { area: 'Jakarta Utara', sales: 51339, color: '#0088FE' },
  { area: 'Jakarta Barat', sales: 27541, color: '#00C49F' },
  { area: 'Bekasi', sales: 26543, color: '#FFBB28' },
  { area: 'Depok', sales: 14482, color: '#FF8042' },
  { area: 'Bandung', sales: 8883, color: '#8884D8' },
];

// Updated Daily Sales Data - changed to Sub Category/Brand
const dailySalesByCategory = [
  { date: '22 May', susu: 2000, tisu: 1800 },
  { date: '24 May', susu: 2200, tisu: 1900 },
  { date: '26 May', susu: 2100, tisu: 2000 },
  { date: '28 May', susu: 2400, tisu: 2100 },
  { date: '30 May', susu: 2600, tisu: 2200 },
];

const dailySalesByBrand = [
  { date: '22 May', ultraMilk: 1200, prochiz: 800, greenfields: 600, diamond: 400, mimiWhite: 300 },
  { date: '24 May', ultraMilk: 1300, prochiz: 850, greenfields: 650, diamond: 420, mimiWhite: 320 },
  { date: '26 May', ultraMilk: 1400, prochiz: 900, greenfields: 700, diamond: 450, mimiWhite: 350 },
  { date: '28 May', ultraMilk: 1500, prochiz: 950, greenfields: 750, diamond: 480, mimiWhite: 380 },
  { date: '30 May', ultraMilk: 1600, prochiz: 1000, greenfields: 800, diamond: 500, mimiWhite: 400 },
];

const dailySalesByChannel = [
  { date: '22 May', segari: 800, astro: 650, klickIndomaret: 600, alfagift: 500, superindo: 450, mysuperindo: 300 },
  { date: '24 May', segari: 850, astro: 700, klickIndomaret: 650, alfagift: 550, superindo: 480, mysuperindo: 320 },
  { date: '26 May', segari: 900, astro: 750, klickIndomaret: 700, alfagift: 600, superindo: 500, mysuperindo: 350 },
  { date: '28 May', segari: 950, astro: 800, klickIndomaret: 750, alfagift: 650, superindo: 520, mysuperindo: 380 },
  { date: '30 May', segari: 1000, astro: 850, klickIndomaret: 800, alfagift: 700, superindo: 550, mysuperindo: 400 },
];

const topBrandSales = [
  { brand: 'Ultra Milk', marketShare: 13.10, salesValue: 5438379750, itemsSold: 112115, growth: -19.3 },
  { brand: 'Prochiz', marketShare: 9.82, salesValue: 4077579134, itemsSold: 134859, growth: 118.0 },
  { brand: 'Greenfields', marketShare: 8.58, salesValue: 3564235051, itemsSold: 57592, growth: -5.3 },
  { brand: 'Mimi White', marketShare: 5.15, salesValue: 2136664158, itemsSold: 41654, growth: 101.5 },
  { brand: 'Diamond', marketShare: 4.40, salesValue: 1827310515, itemsSold: 45633, growth: -1.7 },
];

const stockMovementData = [
  { date: '20 May', restock: 750, oos: 120, itemSold: 450 },
  { date: '22 May', restock: 800, oos: 95, itemSold: 520 },
  { date: '24 May', restock: 650, oos: 150, itemSold: 480 },
  { date: '26 May', restock: 900, oos: 80, itemSold: 600 },
  { date: '28 May', restock: 720, oos: 110, itemSold: 540 },
  { date: '30 May', restock: 850, oos: 70, itemSold: 650 },
];

// Area Sales Table Data - updated format
const areaSalesTableData = [
  { city: 'Jakarta Utara', unitsSold: 51339, avgDiscount: 19.61, revenue: 2890000000 },
  { city: 'Jakarta Barat', unitsSold: 27541, avgDiscount: 6.87, revenue: 1950000000 },
  { city: 'Bekasi', unitsSold: 26543, avgDiscount: 12.56, revenue: 1750000000 },
  { city: 'Depok', unitsSold: 14482, avgDiscount: 15.75, revenue: 980000000 },
  { city: 'Bandung', unitsSold: 8883, avgDiscount: 6.67, revenue: 620000000 },
];

// Updated SKU Coverage data to swap axes
const skuCoverageData = [
  { category: 'Susu', segari: 85, astro: 72, klickIndomaret: 78, alfagift: 65, superindo: 88 },
  { category: 'Tisu', segari: 92, astro: 68, klickIndomaret: 89, alfagift: 95, superindo: 45 },
];

// New data for promotion analysis
const discountSalesData = [
  { area: 'Jakarta', withDiscount: 18500, withoutDiscount: 12300 },
  { area: 'Surabaya', withDiscount: 15200, withoutDiscount: 11800 },
  { area: 'Bandung', withDiscount: 16800, withoutDiscount: 10500 },
  { area: 'Medan', withDiscount: 13400, withoutDiscount: 9200 },
  { area: 'Makassar', withDiscount: 14600, withoutDiscount: 8900 },
];

const brandDiscountFrequency = [
  { brand: 'Ultra Milk', segari: 45, astro: 32, klickIndomaret: 28, alfagift: 35, uplift: 35 },
  { brand: 'Prochiz', segari: 38, astro: 42, klickIndomaret: 31, alfagift: 29, uplift: 42 },
  { brand: 'Greenfields', segari: 52, astro: 28, klickIndomaret: 35, alfagift: 41, uplift: 28 },
  { brand: 'Diamond', segari: 29, astro: 35, klickIndomaret: 42, alfagift: 38, uplift: 31 },
];

// New data for Stock Movement table - updated with average days
const restockTableData = [
  { itemName: 'Ultra Milk 1L', channel: 'Segari', brand: 'Ultramilk', avgDaysBetweenRestock: 4.2, totalRestockAmount: 2400 },
  { itemName: 'Greenfields Fresh Milk', channel: 'Astro', brand: 'Greenfields', avgDaysBetweenRestock: 3.8, totalRestockAmount: 1800 },
  { itemName: 'Diamond Tissue', channel: 'Klik Indomaret', brand: 'Diamond', avgDaysBetweenRestock: 5.1, totalRestockAmount: 3200 },
  { itemName: 'Prochiz Cheese', channel: 'Alfagift', brand: 'Prochiz', avgDaysBetweenRestock: 4.5, totalRestockAmount: 1500 },
  { itemName: 'Mimi White Tissue', channel: 'SuperIndo', brand: 'Mimi White', avgDaysBetweenRestock: 4.8, totalRestockAmount: 2100 },
];

// New data for Brand & Product table
const skuPerBrandTableData = [
  { brand: 'Ultramilk', astro: 2899, segari: 457, klickIndomaret: 897, superindo: 278, alfagift: 312 },
  { brand: 'Greenfields', astro: 2263, segari: 380, klickIndomaret: 413, superindo: 168, alfagift: 245 },
  { brand: 'Diamond', astro: 1573, segari: 344, klickIndomaret: 474, superindo: 179, alfagift: 198 },
  { brand: 'Prochiz', astro: 1754, segari: 210, klickIndomaret: 368, superindo: 205, alfagift: 287 },
  { brand: 'Mimi White', astro: 1234, segari: 289, klickIndomaret: 345, superindo: 156, alfagift: 223 },
];

// New data for SKU Sales by Channel table
const skuSalesByChannelData = [
  { subCategory: 'Susu', sku: 'Ultramilk Strawberry 250ml', astro: 2899, segari: 457, klickIndomaret: 897, superindo: 278, alfagift: 312 },
  { subCategory: 'Susu', sku: 'Greenfields Fresh Milk 1L', astro: 2263, segari: 380, klickIndomaret: 413, superindo: 168, alfagift: 245 },
  { subCategory: 'Tisu', sku: 'Diamond Premium Tissue', astro: 1573, segari: 344, klickIndomaret: 474, superindo: 179, alfagift: 198 },
  { subCategory: 'Susu', sku: 'Prochiz Cheese Spread', astro: 1754, segari: 210, klickIndomaret: 368, superindo: 205, alfagift: 287 },
  { subCategory: 'Tisu', sku: 'Mimi White Soft Tissue', astro: 1234, segari: 289, klickIndomaret: 345, superindo: 156, alfagift: 223 },
];

// New data for Category Distribution by Channel
const categoryByChannelData = [
  { channel: 'Segari', susu: 75, tisu: 25 },
  { channel: 'Astro', susu: 68, tisu: 32 },
  { channel: 'Klik Indomaret', susu: 72, tisu: 28 },
  { channel: 'Alfagift', susu: 65, tisu: 35 },
  { channel: 'SuperIndo', susu: 70, tisu: 30 },
];

// New data for SKU Coverage Overtime
const skuCoverageOvertimeData = [
  { month: 'Jan', totalSKU: 12000, segari: 8500, astro: 7200, klickIndomaret: 7800, alfagift: 6500, superindo: 8800 },
  { month: 'Feb', totalSKU: 12200, segari: 8600, astro: 7300, klickIndomaret: 7900, alfagift: 6600, superindo: 8900 },
  { month: 'Mar', totalSKU: 12400, segari: 8700, astro: 7400, klickIndomaret: 8000, alfagift: 6700, superindo: 9000 },
  { month: 'Apr', totalSKU: 12300, segari: 8650, astro: 7350, klickIndomaret: 7950, alfagift: 6650, superindo: 8950 },
  { month: 'May', totalSKU: 12500, segari: 8750, astro: 7450, klickIndomaret: 8050, alfagift: 6750, superindo: 9050 },
  { month: 'Jun', totalSKU: 12600, segari: 8800, astro: 7500, klickIndomaret: 8100, alfagift: 6800, superindo: 9100 },
];

// Missing data definition for daily discount comparison
const dailyDiscountData = [
  { date: '20 May', withDiscount: 1850, noDiscount: 1230 },
  { date: '22 May', withDiscount: 1920, noDiscount: 1180 },
  { date: '24 May', withDiscount: 1680, noDiscount: 1050 },
  { date: '26 May', withDiscount: 2100, noDiscount: 1320 },
  { date: '28 May', withDiscount: 1980, noDiscount: 1240 },
  { date: '30 May', withDiscount: 2250, noDiscount: 1410 },
];

// New data for Category Performance - focus on SKU saturation and competition
const categoryPerformanceData = [
  { category: 'Susu', totalSKU: 8500, totalSales: 15500000, avgSalesPerSKU: 1824, competitionLevel: 'High' },
  { category: 'Tisu', totalSKU: 3500, totalSales: 8200000, avgSalesPerSKU: 2343, competitionLevel: 'Medium' },
];

// Category Performance by Channel
const categoryChannelPerformanceData = [
  { category: 'Susu', segari: 4500000, astro: 3200000, klickIndomaret: 3800000, superindo: 2100000, alfagift: 1900000 },
  { category: 'Tisu', segari: 2800000, astro: 1900000, klickIndomaret: 2100000, superindo: 800000, alfagift: 500000 },
];

// New Price Comparison Table Data
const priceComparisonTableData = [
  { skuName: 'Ultramilk Strawberry 250ml', subCategory: 'Susu', astro: 125, segari: 118, klickIndomaret: 130, superindo: 115, alfagift: 127, avgPrice: 123 },
  { skuName: 'Greenfields Fresh Milk 1L', subCategory: 'Susu', astro: 89, segari: 95, klickIndomaret: 92, superindo: 88, alfagift: 91, avgPrice: 91 },
  { skuName: 'Diamond Premium Tissue', subCategory: 'Tisu', astro: 245, segari: 230, klickIndomaret: 255, superindo: 225, alfagift: 240, avgPrice: 239 },
  { skuName: 'Prochiz Cheese Spread', subCategory: 'Susu', astro: 67, segari: 72, klickIndomaret: 70, superindo: 65, alfagift: 68, avgPrice: 68 },
  { skuName: 'Mimi White Soft Tissue', subCategory: 'Tisu', astro: 156, segari: 148, klickIndomaret: 160, superindo: 145, alfagift: 152, avgPrice: 152 },
];

// Brand Discount Table Data
const brandDiscountTableData = [
  { brand: 'Greenfields', sku: 'Fresh Milk 1L', astro: 25, segari: 20, klickIndomaret: 30, superindo: 15, alfagift: 22, salesWithDiscount: 2400, salesNoDiscount: 1800, uplift: 33 },
  { brand: 'Ultramilk', sku: 'UHT Milk 1L', astro: 18, segari: 22, klickIndomaret: 20, superindo: 25, alfagift: 19, salesWithDiscount: 3200, salesNoDiscount: 2100, uplift: 52 },
  { brand: 'Diamond', sku: 'Premium Tissue', astro: 15, segari: 18, klickIndomaret: 12, superindo: 20, alfagift: 16, salesWithDiscount: 1800, salesNoDiscount: 1500, uplift: 20 },
  { brand: 'Prochiz', sku: 'Cheese Spread', astro: 28, segari: 35, klickIndomaret: 31, superindo: 29, alfagift: 32, salesWithDiscount: 1500, salesNoDiscount: 1200, uplift: 25 },
  { brand: 'Mimi White', sku: 'Soft Tissue', astro: 22, segari: 25, klickIndomaret: 20, superindo: 18, alfagift: 24, salesWithDiscount: 1200, salesNoDiscount: 900, uplift: 33 },
];

// Promotion Examples Table Data
const promotionExamplesTableData = [
  { brand: 'Ultramilk', typeOfPromotion: 'Bundling', listingName: 'Bundling Ultramilk 200ml and 100ml', salesValue: 100000 },
  { brand: 'Greenfields', typeOfPromotion: 'Discount', listingName: 'Fresh Milk 1L - 20% Off', salesValue: 85000 },
  { brand: 'Diamond', typeOfPromotion: 'Buy 2 Get 1', listingName: 'Diamond Tissue Triple Pack', salesValue: 75000 },
  { brand: 'Prochiz', typeOfPromotion: 'Cashback', listingName: 'Prochiz Cheese - Cashback 15%', salesValue: 65000 },
  { brand: 'Mimi White', typeOfPromotion: 'Flash Sale', listingName: 'Mimi White 12 Hour Flash Sale', salesValue: 45000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('overview');
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('all');
  const [dailySalesView, setDailySalesView] = useState('category'); // 'category', 'brand', or 'channel'

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'sales', label: 'Brand Sales', icon: Activity },
    { id: 'inventory', label: 'Stock Movement', icon: Package },
    { id: 'brands', label: 'Brand & Product', icon: TrendingUp },
    { id: 'assortment', label: 'Assortment Analysis', icon: Package },
    { id: 'category', label: 'Category Performance', icon: PieChartIcon },
    { id: 'pricing', label: 'Price Analysis', icon: DollarSign },
    { id: 'promotion', label: 'Promotion Analysis', icon: Target },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Unit Sold</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">29.9K</div>
            <p className="text-xs text-green-600">+5% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SKU</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-green-600">+8% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31.2 Bio</div>
            <p className="text-xs text-green-600">+12% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AVG SKU in Channel</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,879</div>
            <p className="text-xs text-green-600">+3% from last period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Channel</CardTitle>
            <CardDescription>Distribution across different sales channels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={salesChannelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesChannelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Performance across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={salesCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Area</CardTitle>
            <CardDescription>Performance across different areas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={salesByAreaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <RechartsTooltip formatter={(value) => value.toLocaleString()} />
                <Bar dataKey="sales" fill="#8884d8" name="Sales" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Brand Sales</CardTitle>
          <CardDescription>Daily sales performance by brand</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailySalesByBrand}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Area type="monotone" dataKey="ultraMilk" stackId="1" stroke="#8884d8" fill="#8884d8" name="Ultra Milk" />
              <Area type="monotone" dataKey="prochiz" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Prochiz" />
              <Area type="monotone" dataKey="greenfields" stackId="1" stroke="#ffc658" fill="#ffc658" name="Greenfields" />
              <Area type="monotone" dataKey="diamond" stackId="1" stroke="#ff7300" fill="#ff7300" name="Diamond" />
              <Area type="monotone" dataKey="mimiWhite" stackId="1" stroke="#00ff00" fill="#00ff00" name="Mimi White" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Added Out of Stock Monitoring with Brand POV: Greenfields Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Out of Stock Monitoring with Brand POV: Greenfields Analysis</CardTitle>
          <CardDescription>High demand items with OOS issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-red-50">
              <h4 className="font-semibold text-red-800">🚨 Critical OOS Alert - Greenfields</h4>
              <p className="text-sm text-red-700 mt-1">High demand product experiencing frequent stockouts</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h5 className="font-medium">Areas with High Demand but OOS:</h5>
                {[
                  { area: 'Jakarta Utara', demand: 'High', oos: 15, impact: 'Critical', channel: 'Segari, Astro' },
                  { area: 'Bandung', demand: 'High', oos: 12, impact: 'High', channel: 'Klik Indomaret' },
                  { area: 'Surabaya', demand: 'Medium', oos: 8, impact: 'Medium', channel: 'Alfagift, SuperIndo' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border-b">
                    <div>
                      <div className="font-medium">{item.area}</div>
                      <div className="text-sm text-muted-foreground">Demand: {item.demand}</div>
                      <div className="text-xs text-red-600">Channel OOS: {item.channel}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">{item.oos} OOS</div>
                      <Badge variant={item.impact === 'Critical' ? 'destructive' : 'secondary'}>
                        {item.impact}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium">Recommended Actions:</h5>
                <div className="space-y-2">
                  <div className="p-2 bg-green-50 rounded border">
                    <div className="text-sm font-medium text-green-800">Increase Safety Stock</div>
                    <div className="text-xs text-green-600">+25% in Jakarta Utara</div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded border">
                    <div className="text-sm font-medium text-blue-800">Faster Restock Cycle</div>
                    <div className="text-xs text-blue-600">4.2 days → 2.5 days</div>
                  </div>
                  <div className="p-2 bg-yellow-50 rounded border">
                    <div className="text-sm font-medium text-yellow-800">Alternative Products</div>
                    <div className="text-xs text-yellow-600">Promote similar items</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSalesAnalysis = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">IDR 17.04B</div>
            <p className="text-xs text-green-600">+12.3% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units Sold</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">391,853</div>
            <p className="text-xs text-green-600">+8.7% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SKU</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">29,940</div>
            <p className="text-xs text-muted-foreground">Active products</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Brand Market Share (Greenfields)</CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.58%</div>
            <p className="text-xs text-red-600">-5.3% growth rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Brand Sales - moved to top after KPI cards */}
      <Card>
        <CardHeader>
          <CardTitle>Top Brand Sales</CardTitle>
          <CardDescription>Leading brands by market share and growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Brand</TableHead>
                  <TableHead className="text-center">Market Share (%)</TableHead>
                  <TableHead className="text-center">Total Sales (IDR)</TableHead>
                  <TableHead className="text-center">Growth Rate (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topBrandSales.map((brand, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{brand.brand}</TableCell>
                    <TableCell className="text-center">{brand.marketShare}%</TableCell>
                    <TableCell className="text-center">IDR {(brand.salesValue / 1000000000).toFixed(2)}B</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={brand.growth > 0 ? "default" : "destructive"}>
                        {brand.growth > 0 ? "+" : ""}{brand.growth}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Detailed Sales</CardTitle>
          <CardDescription>Sales tracking across different sub categories, brands, and channels</CardDescription>
          <div className="flex gap-2 mt-2">
            <Button 
              variant={dailySalesView === 'category' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setDailySalesView('category')}
            >
              Sub Category
            </Button>
            <Button 
              variant={dailySalesView === 'brand' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setDailySalesView('brand')}
            >
              Brand
            </Button>
            <Button 
              variant={dailySalesView === 'channel' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setDailySalesView('channel')}
            >
              Channel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            {dailySalesView === 'category' ? (
              <AreaChart data={dailySalesByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Area type="monotone" dataKey="susu" stackId="1" stroke="#8884d8" fill="#8884d8" name="Susu" />
                <Area type="monotone" dataKey="tisu" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Tisu" />
              </AreaChart>
            ) : dailySalesView === 'brand' ? (
              <AreaChart data={dailySalesByBrand}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Area type="monotone" dataKey="ultraMilk" stackId="1" stroke="#8884d8" fill="#8884d8" name="Ultra Milk" />
                <Area type="monotone" dataKey="prochiz" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Prochiz" />
                <Area type="monotone" dataKey="greenfields" stackId="1" stroke="#ffc658" fill="#ffc658" name="Greenfields" />
                <Area type="monotone" dataKey="diamond" stackId="1" stroke="#ff7300" fill="#ff7300" name="Diamond" />
                <Area type="monotone" dataKey="mimiWhite" stackId="1" stroke="#00ff00" fill="#00ff00" name="Mimi White" />
              </AreaChart>
            ) : (
              <AreaChart data={dailySalesByChannel}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Area type="monotone" dataKey="segari" stackId="1" stroke="#8884d8" fill="#8884d8" name="Segari" />
                <Area type="monotone" dataKey="astro" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Astro" />
                <Area type="monotone" dataKey="klickIndomaret" stackId="1" stroke="#ffc658" fill="#ffc658" name="Klik Indomaret" />
                <Area type="monotone" dataKey="alfagift" stackId="1" stroke="#ff7300" fill="#ff7300" name="Alfagift" />
                <Area type="monotone" dataKey="superindo" stackId="1" stroke="#00ff00" fill="#00ff00" name="SuperIndo" />
                <Area type="monotone" dataKey="mysuperindo" stackId="1" stroke="#ff0080" fill="#ff0080" name="MySuperIndo" />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Brand Sales</CardTitle>
            <CardDescription>Leading brands by market share and growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topBrandSales.map((brand, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{brand.brand}</div>
                    <div className="text-sm text-muted-foreground">
                      Market Share: {brand.marketShare}%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${(brand.salesValue / 1000000).toFixed(1)}M</div>
                    <Badge variant={brand.growth > 0 ? "default" : "destructive"}>
                      {brand.growth > 0 ? "+" : ""}{brand.growth}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Channel</CardTitle>
            <CardDescription>Channel distribution of total sales</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesChannelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesChannelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sales by Subcategory</CardTitle>
            <CardDescription>Subcategory distribution of total sales</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Sales Per Brand by Channel</CardTitle>
            <CardDescription>Brand sales across different channels</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <Select value={selectedBrandFilter} onValueChange={setSelectedBrandFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                <SelectItem value="greenfields">Greenfields</SelectItem>
                <SelectItem value="ultramilk">Ultramilk</SelectItem>
                <SelectItem value="diamond">Diamond</SelectItem>
                <SelectItem value="prochiz">Prochiz</SelectItem>
                <SelectItem value="mimiwhite">Mimi White</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topBrandsData.filter(brand => 
              selectedBrandFilter === 'all' || 
              brand.brand.toLowerCase().replace(' ', '') === selectedBrandFilter
            )}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="brand" />
              <YAxis />
              <RechartsTooltip formatter={(value) => `IDR ${(Number(value) / 1000000).toFixed(1)}M`} />
              <Legend />
              <Bar dataKey="astroSales" fill="#8884d8" name="Astro" />
              <Bar dataKey="segariSales" fill="#82ca9d" name="Segari" />
              <Bar dataKey="alfagiftSales" fill="#ffc658" name="Alfagift" />
              <Bar dataKey="klickIndomaretSales" fill="#ff7300" name="Klikindomaret" />
              <Bar dataKey="mysuperindoSales" fill="#00ff00" name="MySuperIndo" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderStockMovement = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unit Sold</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,567</div>
            <p className="text-xs text-green-600">+5% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">OOS Item</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-red-600">-2% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AVG Restock Amount</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">155</div>
            <p className="text-xs text-green-600">+12% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AVG Restock Day Per Item</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-green-600">+8% from last period</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Stock Movement</CardTitle>
          <CardDescription>Track restock, out-of-stock, and items sold over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stockMovementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="restock" stroke="#8884d8" strokeWidth={2} name="Restock" />
              <Line type="monotone" dataKey="oos" stroke="#ff7300" strokeWidth={2} name="OOS" />
              <Line type="monotone" dataKey="itemSold" stroke="#82ca9d" strokeWidth={2} name="Item Sold" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Velocity vs Stock Level</CardTitle>
            <CardDescription>Analyzing if stock levels can cover projected sales</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesVelocityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <RechartsTooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="stock" fill="#8884d8" name="Stock Level" />
                <Line yAxisId="right" type="monotone" dataKey="sales" stroke="#82ca9d" strokeWidth={2} name="Sales" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Velocity Trend</CardTitle>
            <CardDescription>Monthly sales velocity ratio</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesVelocityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Area type="monotone" dataKey="velocity" stroke="#8884d8" fill="#8884d8" name="Velocity Ratio" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Restock Per Item</CardTitle>
          <CardDescription>Average restock frequency analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">1.7x</div>
              <div className="text-sm text-muted-foreground">Weekly Restock Per Item</div>
              <div className="text-xs text-gray-500 mt-1">(based on 4.2 day cycle)</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">4.2</div>
              <div className="text-sm text-muted-foreground">Days Between Restock</div>
              <div className="text-xs text-gray-500 mt-1">Average cycle time</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">78%</div>
              <div className="text-sm text-muted-foreground">Restock Success Rate</div>
              <div className="text-xs text-gray-500 mt-1">% of planned restocks completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Restock Details</CardTitle>
          <CardDescription>Item-level restock analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead className="text-center">Avg Days Between Restock</TableHead>
                <TableHead className="text-center">Total Restock Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {restockTableData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.itemName}</TableCell>
                  <TableCell>{item.channel}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell className="text-center">{item.avgDaysBetweenRestock}</TableCell>
                  <TableCell className="text-center">{item.totalRestockAmount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand POV: Greenfields Analysis</CardTitle>
          <CardDescription>High demand items with OOS issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-red-50">
              <h4 className="font-semibold text-red-800">🚨 Critical OOS Alert - Greenfields</h4>
              <p className="text-sm text-red-700 mt-1">High demand product experiencing frequent stockouts</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h5 className="font-medium">Areas with High Demand but OOS:</h5>
                {[
                  { area: 'Jakarta Utara', demand: 'High', oos: 15, impact: 'Critical', channel: 'Segari, Astro' },
                  { area: 'Bandung', demand: 'High', oos: 12, impact: 'High', channel: 'Klik Indomaret' },
                  { area: 'Surabaya', demand: 'Medium', oos: 8, impact: 'Medium', channel: 'Alfagift, SuperIndo' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border-b">
                    <div>
                      <div className="font-medium">{item.area}</div>
                      <div className="text-sm text-muted-foreground">Demand: {item.demand}</div>
                      <div className="text-xs text-red-600">Channel OOS: {item.channel}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">{item.oos} OOS</div>
                      <Badge variant={item.impact === 'Critical' ? 'destructive' : 'secondary'}>
                        {item.impact}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium">Recommended Actions:</h5>
                <div className="space-y-2">
                  <div className="p-2 bg-green-50 rounded border">
                    <div className="text-sm font-medium text-green-800">Increase Safety Stock</div>
                    <div className="text-xs text-green-600">+25% in Jakarta Utara</div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded border">
                    <div className="text-sm font-medium text-blue-800">Faster Restock Cycle</div>
                    <div className="text-xs text-blue-600">4.2 days → 2.5 days</div>
                  </div>
                  <div className="p-2 bg-yellow-50 rounded border">
                    <div className="text-sm font-medium text-yellow-800">Alternative Products</div>
                    <div className="text-xs text-yellow-600">Promote similar items</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBrandProduct = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SKU</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">29.9K</div>
            <p className="text-xs text-muted-foreground">Active products</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Brand</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">Unique brands</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AVG SKU in Channel</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,909</div>
            <p className="text-xs text-muted-foreground">Per channel</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AVG SKU Per Brand</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,879</div>
            <p className="text-xs text-muted-foreground">Per brand average</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales by Channel</CardTitle>
          <CardDescription>Channel performance across different sales platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesChannelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {salesChannelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Brand Sales</CardTitle>
          <CardDescription>Sales tracking of top brands over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={dailySalesByBrand}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Area type="monotone" dataKey="ultraMilk" stackId="1" stroke="#8884d8" fill="#8884d8" name="Ultra Milk" />
              <Area type="monotone" dataKey="prochiz" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Prochiz" />
              <Area type="monotone" dataKey="greenfields" stackId="1" stroke="#ffc658" fill="#ffc658" name="Greenfields" />
              <Area type="monotone" dataKey="diamond" stackId="1" stroke="#ff7300" fill="#ff7300" name="Diamond" />
              <Area type="monotone" dataKey="mimiWhite" stackId="1" stroke="#00ff00" fill="#00ff00" name="Mimi White" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Area and Category With High Stock</CardTitle>
            <CardDescription>Areas with highest inventory levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { city: 'Bandung', category: 'Keju', stock: 567078 },
                { city: 'Bandung', category: 'Susu UHT', stock: 291508 },
                { city: 'Jakarta Timur', category: 'Susu Segar & Pasteurisasi', stock: 282636 },
                { city: 'Jakarta Barat', category: 'Susu UHT', stock: 259907 },
                { city: 'Depok', category: 'Susu UHT', stock: 210976 },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 border-b">
                  <div>
                    <div className="font-medium">{item.city}</div>
                    <div className="text-sm text-muted-foreground">{item.category}</div>
                  </div>
                  <div className="font-bold">{item.stock.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Area and Category With High Demand</CardTitle>
            <CardDescription>Areas with highest sales demand</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { city: 'Bandung', category: 'Susu UHT', units: 77354 },
                { city: 'Bandung', category: 'Keju', units: 53204 },
                { city: 'Bekasi', category: 'Susu UHT', units: 48795 },
                { city: 'Jakarta Barat', category: 'Keju', units: 42093 },
                { city: 'Jakarta Barat', category: 'Susu UHT', units: 40849 },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 border-b">
                  <div>
                    <div className="font-medium">{item.city}</div>
                    <div className="text-sm text-muted-foreground">{item.category}</div>
                  </div>
                  <div className="font-bold">{item.units.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SKU Per Brand by Channel</CardTitle>
          <CardDescription>Number of SKUs per brand across channels</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead className="text-center">Astro</TableHead>
                <TableHead className="text-center">Segari</TableHead>
                <TableHead className="text-center">Klik Indomaret</TableHead>
                <TableHead className="text-center">Superindo</TableHead>
                <TableHead className="text-center">Alfagift</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skuPerBrandTableData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.brand}</TableCell>
                  <TableCell className="text-center">{item.astro.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{item.segari.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{item.klickIndomaret.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{item.superindo.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{item.alfagift.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SKU Sales by Channel</CardTitle>
          <CardDescription>SKU-level sales performance across different channels</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sub Category</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-center">Astro</TableHead>
                <TableHead className="text-center">Segari</TableHead>
                <TableHead className="text-center">Klik Indomaret</TableHead>
                <TableHead className="text-center">Superindo</TableHead>
                <TableHead className="text-center">Alfagift</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skuSalesByChannelData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.subCategory}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell className="text-center">{item.astro.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{item.segari.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{item.klickIndomaret.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{item.superindo.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{item.alfagift.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderAssortmentAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>SKU Coverage by Brand</CardTitle>
            <CardDescription>Comparison between Astro and Segari coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={assortmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="brand" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="astro" fill="#8884d8" name="Astro" />
                <Bar dataKey="segari" fill="#82ca9d" name="Segari" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SKU Coverage by Channel</CardTitle>
            <CardDescription>Coverage across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skuCoverageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="segari" fill="#8884d8" name="Segari" />
                <Bar dataKey="astro" fill="#82ca9d" name="Astro" />
                <Bar dataKey="klickIndomaret" fill="#ffc658" name="Klik Indomaret" />
                <Bar dataKey="alfagift" fill="#ff7300" name="Alfagift" />
                <Bar dataKey="superindo" fill="#00ff00" name="SuperIndo" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Distribution by Channel</CardTitle>
          <CardDescription>Category distribution across different channels</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryByChannelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis />
              <RechartsTooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="susu" fill="#8884d8" name="Susu %" />
              <Bar dataKey="tisu" fill="#82ca9d" name="Tisu %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SKU Coverage Overtime</CardTitle>
          <CardDescription>SKU coverage trends across channels over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={skuCoverageOvertimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="segari" stroke="#8884d8" strokeWidth={2} name="Segari" />
              <Line type="monotone" dataKey="astro" stroke="#82ca9d" strokeWidth={2} name="Astro" />
              <Line type="monotone" dataKey="klickIndomaret" stroke="#ffc658" strokeWidth={2} name="Klik Indomaret" />
              <Line type="monotone" dataKey="alfagift" stroke="#ff7300" strokeWidth={2} name="Alfagift" />
              <Line type="monotone" dataKey="superindo" stroke="#00ff00" strokeWidth={2} name="SuperIndo" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderCategoryPerformance = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Category Market Saturation Analysis</CardTitle>
          <CardDescription>SKU density and competition analysis per category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryPerformanceData.map((category, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{category.category}</h3>
                  <Badge variant={category.competitionLevel === 'High' ? 'destructive' : 'default'}>
                    {category.competitionLevel} Competition
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total SKUs:</span>
                    <span className="font-medium">{category.totalSKU.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Sales:</span>
                    <span className="font-medium">${(category.totalSales / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Avg Sales per SKU:</span>
                    <span className="font-medium">${category.avgSalesPerSKU.toLocaleString()}</span>
                  </div>
                  <div className="mt-3 p-2 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">
                      {category.competitionLevel === 'High' 
                        ? 'Market is highly saturated with many SKUs competing for sales. Lower sales per SKU indicates intense competition.'
                        : 'Market has moderate saturation. Higher sales per SKU suggests less competition and better performance per product.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Performance by Channel</CardTitle>
          <CardDescription>Sales performance of each category across different channels</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={categoryChannelPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <RechartsTooltip formatter={(value) => `$${(Number(value) / 1000000).toFixed(1)}M`} />
              <Legend />
              <Bar dataKey="segari" fill="#8884d8" name="Segari" />
              <Bar dataKey="astro" fill="#82ca9d" name="Astro" />
              <Bar dataKey="klickIndomaret" fill="#ffc658" name="Klik Indomaret" />
              <Bar dataKey="superindo" fill="#ff7300" name="Superindo" />
              <Bar dataKey="alfagift" fill="#00ff00" name="Alfagift" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Competition Insights</CardTitle>
          <CardDescription>Key insights about market competition and opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-red-50">
              <h4 className="font-semibold text-red-800">🔴 High Competition Alert - Susu Category</h4>
              <p className="text-sm text-red-700 mt-1">
                With 8,500 SKUs and average sales of $1,824 per SKU, the Susu market is highly saturated. 
                Consider focusing on premium products or unique positioning to stand out.
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-green-50">
              <h4 className="font-semibold text-green-800">🟢 Opportunity in Tisu Category</h4>
              <p className="text-sm text-green-700 mt-1">
                Tisu category shows better performance with only 3,500 SKUs and higher average sales of $2,343 per SKU. 
                This indicates less competition and potential for growth.
              </p>
            </div>

            <div className="p-4 border rounded-lg bg-blue-50">
              <h4 className="font-semibold text-blue-800">📊 Strategic Recommendations</h4>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Focus new product launches in Tisu category for better ROI</li>
                <li>• In Susu category, prioritize product differentiation and premium positioning</li>
                <li>• Consider consolidating underperforming SKUs in saturated categories</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPricingAnalysis = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Price Comparison Across Channels</CardTitle>
          <CardDescription>Comprehensive price analysis with variance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU Name</TableHead>
                <TableHead>Sub Category</TableHead>
                <TableHead className="text-center">Astro</TableHead>
                <TableHead className="text-center">Segari</TableHead>
                <TableHead className="text-center">Klik Indomaret</TableHead>
                <TableHead className="text-center">Superindo</TableHead>
                <TableHead className="text-center">Alfagift</TableHead>
                <TableHead className="text-center">Avg Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceComparisonTableData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.skuName}</TableCell>
                  <TableCell>{item.subCategory}</TableCell>
                  <TableCell className="text-center">
                    <span className={item.astro > item.avgPrice ? 'text-red-600 font-medium' : item.astro < item.avgPrice ? 'text-green-600 font-medium' : ''}>
                      ${item.astro}
                      {item.astro > item.avgPrice && ' ↑'}
                      {item.astro < item.avgPrice && ' ↓'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={item.segari > item.avgPrice ? 'text-red-600 font-medium' : item.segari < item.avgPrice ? 'text-green-600 font-medium' : ''}>
                      ${item.segari}
                      {item.segari > item.avgPrice && ' ↑'}
                      {item.segari < item.avgPrice && ' ↓'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={item.klickIndomaret > item.avgPrice ? 'text-red-600 font-medium' : item.klickIndomaret < item.avgPrice ? 'text-green-600 font-medium' : ''}>
                      ${item.klickIndomaret}
                      {item.klickIndomaret > item.avgPrice && ' ↑'}
                      {item.klickIndomaret < item.avgPrice && ' ↓'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={item.superindo > item.avgPrice ? 'text-red-600 font-medium' : item.superindo < item.avgPrice ? 'text-green-600 font-medium' : ''}>
                      ${item.superindo}
                      {item.superindo > item.avgPrice && ' ↑'}
                      {item.superindo < item.avgPrice && ' ↓'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={item.alfagift > item.avgPrice ? 'text-red-600 font-medium' : item.alfagift < item.avgPrice ? 'text-green-600 font-medium' : ''}>
                      ${item.alfagift}
                      {item.alfagift > item.avgPrice && ' ↑'}
                      {item.alfagift < item.avgPrice && ' ↓'}
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-medium">${item.avgPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>🔴 Red prices (↑) = Above average | 🟢 Green prices (↓) = Below average</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing Strategy Insights</CardTitle>
          <CardDescription>Strategic recommendations based on price analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-muted-foreground">SKUs Priced Lower</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-sm text-muted-foreground">SKUs Priced Higher</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">8.5%</div>
              <div className="text-sm text-muted-foreground">Avg Price Variance</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPromotionAnalysis = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>AVG Daily Sales: Discount vs No Discount</CardTitle>
            <CardDescription>Sales comparison with and without promotions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={discountSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <RechartsTooltip formatter={(value) => `${(Number(value) / 1000).toFixed(0)}K`} />
                <Legend />
                <Bar dataKey="withDiscount" fill="#82ca9d" name="With Discount" />
                <Bar dataKey="withoutDiscount" fill="#8884d8" name="Without Discount" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Promotion Coverage</CardTitle>
            <CardDescription>Areas with active promotions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'With Promotion', value: 3, color: '#82ca9d' },
                    { name: 'Without Promotion', value: 2, color: '#8884d8' }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#82ca9d" />
                  <Cell fill="#8884d8" />
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Sales: Discount vs No Discount</CardTitle>
          <CardDescription>Daily comparison of sales performance with and without discounts</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyDiscountData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="withDiscount" stroke="#82ca9d" strokeWidth={2} name="With Discount" />
              <Line type="monotone" dataKey="noDiscount" stroke="#8884d8" strokeWidth={2} name="No Discount" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand Discount Frequency & Uplift</CardTitle>
          <CardDescription>Comprehensive discount analysis across brands and channels</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-center">Astro</TableHead>
                <TableHead className="text-center">Segari</TableHead>
                <TableHead className="text-center">Klik Indomaret</TableHead>
                <TableHead className="text-center">Superindo</TableHead>
                <TableHead className="text-center">Alfagift</TableHead>
                <TableHead className="text-center">Sales with Discount</TableHead>
                <TableHead className="text-center">Sales No Discount</TableHead>
                <TableHead className="text-center">% Uplift</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {brandDiscountTableData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.brand}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell className="text-center">{item.astro}%</TableCell>
                  <TableCell className="text-center">{item.segari}%</TableCell>
                  <TableCell className="text-center">{item.klickIndomaret}%</TableCell>
                  <TableCell className="text-center">{item.superindo}%</TableCell>
                  <TableCell className="text-center">{item.alfagift}%</TableCell>
                  <TableCell className="text-center">{item.salesWithDiscount.toLocaleString()}</TableCell>
                  <TableCell className="text-center">{item.salesNoDiscount.toLocaleString()}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="default">+{item.uplift}%</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Promotion Examples by Brand</CardTitle>
          <CardDescription>Types of promotions offered by each brand</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Brand</TableHead>
                <TableHead>Type of Promotion</TableHead>
                <TableHead>Listing Name</TableHead>
                <TableHead className="text-center">Sales Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotionExamplesTableData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.brand}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.typeOfPromotion}</Badge>
                  </TableCell>
                  <TableCell>{item.listingName}</TableCell>
                  <TableCell className="text-center">{item.salesValue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Discount Variation by Area</CardTitle>
          <CardDescription>How discount rates differ across regions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { brand: 'Ultra Milk', jakarta: '25%', surabaya: '20%', bandung: '30%', medan: '15%' },
              { brand: 'Prochiz', jakarta: '18%', surabaya: '22%', bandung: '20%', medan: '25%' },
              { brand: 'Greenfields', jakarta: '15%', surabaya: '18%', bandung: '12%', medan: '20%' },
            ].map((item, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="font-medium mb-2">{item.brand}</div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div className="text-center">
                    <div className="font-medium">{item.jakarta}</div>
                    <div className="text-muted-foreground">Jakarta</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{item.surabaya}</div>
                    <div className="text-muted-foreground">Surabaya</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{item.bandung}</div>
                    <div className="text-muted-foreground">Bandung</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{item.medan}</div>
                    <div className="text-muted-foreground">Medan</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'overview': return renderOverview();
      case 'sales': return renderSalesAnalysis();
      case 'inventory': return renderStockMovement();
      case 'brands': return renderBrandProduct();
      case 'assortment': return renderAssortmentAnalysis();
      case 'category': return renderCategoryPerformance();
      case 'pricing': return renderPricingAnalysis();
      case 'promotion': return renderPromotionAnalysis();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TooltipProvider>
        <div className="flex">
          {/* Sidebar Navigation */}
          <div className="w-64 bg-white shadow-lg min-h-screen">
            <div className="p-6">
              <h1 className="text-xl font-bold text-gray-800">Commerce Analytics</h1>
              <p className="text-sm text-gray-600 mt-1">Quick Commerce Analysis</p>
            </div>
            
            <nav className="mt-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
                      currentPage === item.id ? 'bg-blue-100 border-r-2 border-blue-500 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {navigationItems.find(item => item.id === currentPage)?.label || 'Overview'}
              </h2>
              <p className="text-gray-600 mt-1">
                {currentPage === 'overview' && 'Complete overview of your commerce analysis with key metrics and performance indicators'}
                {currentPage === 'sales' && 'Brand sales analysis with KPIs, channel breakdown, and performance metrics'}
                {currentPage === 'inventory' && 'Stock movement tracking and inventory management insights'}
                {currentPage === 'brands' && 'Comprehensive brand and product sales analysis'}
                {currentPage === 'assortment' && 'Deep dive into SKU coverage and brand distribution'}
                {currentPage === 'category' && 'Analysis of category performance and market saturation'}
                {currentPage === 'pricing' && 'Price benchmarking across channels'}
                {currentPage === 'promotion' && 'Promotion effectiveness and opportunities'}
              </p>
            </div>
            
            {renderCurrentPage()}
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Dashboard;
