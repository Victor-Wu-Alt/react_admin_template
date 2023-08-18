import * as echarts from 'echarts/core'
import {
    GridComponent,
    TitleComponent,
    LegendComponent,
    TooltipComponent,
    ToolboxComponent,
    GeoComponent,
} from 'echarts/components'
import { LineChart, RadarChart, BarChart, PieChart, LinesChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    GridComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition,
    TitleComponent,
    LegendComponent,
    RadarChart,
    TooltipComponent,
    ToolboxComponent,
    GeoComponent,
    BarChart,
    PieChart,
    LinesChart,
])

export default echarts
