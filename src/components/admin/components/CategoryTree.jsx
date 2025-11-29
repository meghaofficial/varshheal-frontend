import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import axiosPrivate from "../../../utils/axiosPrivate";

const CategoryTree = ({ selected = [], onChange }) => {
  const [expanded, setExpanded] = useState({});
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  // Fetch tree from backend
  const getCategoryTree = async () => {
    try {
      setLoading(true);
      const res = await axiosPrivate.get("/categories/tree");
      setTree(res.data.tree); // API returns tree array
    } catch (err) {
      console.error("Failed to fetch category tree:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryTree();
  }, []);

  const renderTree = (nodes) => {
    return nodes.map((node) => (
      <div key={node._id} className="ml-2 my-1">

        {/* Row */}
        <div className="flex items-center gap-2 py-1">
          
          {/* Expand / collapse */}
          {node.children && node.children.length > 0 ? (
            <button
              onClick={() => toggleExpand(node._id)}
              className="text-gray-600"
            >
              {expanded[node._id] ? (
                <FiChevronDown size={16} />
              ) : (
                <FiChevronRight size={16} />
              )}
            </button>
          ) : (
            <div className="w-4" /> // Keeps alignment
          )}

          {/* Checkbox */}
          <input
            type="checkbox"
            checked={selected.includes(node._id)}
            onChange={() => toggleSelect(node._id)}
            className="w-4 h-4"
          />

          {/* Name */}
          <span className="text-gray-800 text-sm">{node.name}</span>
        </div>

        {/* Children */}
        {expanded[node._id] &&
          node.children &&
          node.children.length > 0 && (
            <div className="ml-6 border-l border-gray-200 pl-3">
              {renderTree(node.children)}
            </div>
          )}
      </div>
    ));
  };

  return (
    <div className="bg-white border rounded-md border-gray-200 p-4 max-h-[400px] overflow-y-auto shadow-sm min-h-[300px]">

      {/* Header */}
      <h3 className="font-semibold mb-3">Available subcategories</h3>

      {/* Loading State */}
      {loading && <p className="text-gray-600 text-sm">Loading...</p>}

      {/* Empty State */}
      {!loading && tree?.length === 0 && (
        <p className="text-gray-600 text-sm">No categories available.</p>
      )}

      {/* Render Tree */}
      {!loading && tree?.length > 0 && (
        <div className="text-sm">{renderTree(tree)}</div>
      )}
    </div>
  );
};

export default CategoryTree;
