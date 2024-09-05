import { View } from 'react-native'
import React from 'react'
import { PieChart } from "react-native-chart-kit";
import Svg, { Circle } from "react-native-svg";

const DonutChart = ({data}) => {
    
  return (
    <View
      style={{ elevation: 9 }}
      className="bg-[#fff] mx-3 mt-3 mb-9 shadow shadow-black shadow-offset-0 shadow-offset-t-2 rounded-xl"
    >
      <View className="flex justify-center items-center flex-col">
        <PieChart
          data={data}
          width={400}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2, // optional, default 3
            useShadowColorFromDataset: false,
          }}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          absolute
          hasLegend={true}
          center={[0, 0]} // Adjust this to position the hole in the center
        />
        <Svg
          height="220"
          width={570}
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Circle
            cx={400 / 2}
            cy="110"
            r="60"
            fill="white" // color of the donut hole
          />
        </Svg>
      </View>
    </View>
  );
}

export default DonutChart