import { categories } from "@/constants/data";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

interface CategoryFilterProps {
  activeFilter?: number;
  onFilterChange: (index: number) => void;
}

const CategoryFilter = ({
  activeFilter,
  onFilterChange,
}: CategoryFilterProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="pl-5"
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onFilterChange(index)}
          className={`flex-row items-center gap-2 px-4 py-3 mr-2  rounded-3xl ${
            activeFilter === index
              ? "bg-primary"
              : "bg-transparent border border-primary_outline"
          }`}
        >
          <category.icon
            color={activeFilter === index ? "white" : "#13123A"}
            size={18}
          />
          <Text
            className={`text-xl ${
              activeFilter === index ? "text-white" : "text-secondary"
            } capitalize`}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryFilter;
