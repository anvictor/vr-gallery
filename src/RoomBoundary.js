import React from "react";

class RoomBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("RoomBoundary caught error:", error, info);
  }

  render() {
    // console.log("✅ RoomBoundary rendered without error");

    if (this.state.hasError) {
      console.warn("❌ RoomBoundary caught error:", this.state.error);
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      );
    }

    return this.props.children;
  }
}

export default RoomBoundary;
