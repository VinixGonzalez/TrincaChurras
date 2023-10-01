import React from "react";
import Image from "next/image";
import test from "../../../public/test.svg";

function TestPage() {
  return (
    <div>
      Test Page
      <Image src={test} alt="test" />
    </div>
  );
}

export default TestPage;
