import styles from "./LoadingAnimation.module.css";

interface LoadingAnimationProps {
 size?: "small" | "medium" | "large" | "xlarge";
 type?: "spinner" | "dots" | "rings";
 glow?: boolean;
 className?: string;
}

export default function LoadingAnimation(
    {
     size = "medium",
     type = "spinner",
     glow = false,
     className = ""
    }: LoadingAnimationProps) {
 const loaderClasses = `
    ${styles[size]} 
    ${styles[type]} 
    ${glow ? styles.glow : ""} 
    ${className}
  `.trim();

 return (
     <div className={styles.container}>
      <div className={loaderClasses}></div>
     </div>
 );
}