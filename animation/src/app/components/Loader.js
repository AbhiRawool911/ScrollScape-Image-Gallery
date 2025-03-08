"use client";
import { useState, useEffect } from "react";
import styles from "../styles/globals.css";

export default function Loader({ progress }) {
  return (
    <div className={`${styles.loader} df aic jcc`}>
      <div>
        <h1>Loading</h1>
        <h2 className="loader--text">{progress}%</h2>
      </div>
    </div>
  );
}
