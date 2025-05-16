<script setup>
const version = "0.0.8";
</script>

<template>
  <div class="page">
    <div class="callout boxshadow">
      <div class="about-content">
        <div class="about-heading"><h3>About chronoDot</h3></div>
        <div class="about-description">
          <p>A tiny web app built to help me (and maybe you!) keep track of an ever growing list of interests.</p>
          <p>If you have a lot of interests you might be familiar with the problem of constantly neglecting at least half of them, focusing on a few at a time. To fight this problem I built this simple hobby tracker.</p>
          <p>Unlike with a habit tracker, the goal is not to checkmark everything on schedule, just to track which hobbies you practice each day and visualize your progress over time.</p>
        </div>
      </div>
      <div class="about-content">   
        <div class="about-heading"><h3>Tech Stuff</h3></div>
        <div class="about-description">
          <p>Built with Vue.js, Chart.js and VueCal. Version {{ version }}. All data is stored exclusively in your browser.</p>
        </div>
      </div>
      <div class="about-content">   
        <div class="about-heading"><h3>Who are you?</h3></div>
        <div class="about-description">
          <p>My name's Raziel and I'm a computer science student. Currently on my way to graduating and constantly flitting between new interests whenever I can. At the moment, I'm really getting into Shogi.</p>
        </div>
      </div> 
      <div class="about-content">   
        <div class="about-heading"><h3>Feedback</h3></div>
        <div class="about-description">
          <p>Suggestions? Found a bug? Open an issue on the <a href="https://github.com/raziel-razmattaz/hobby-tracker" target="_blank">GitHub</a>!</p>
        </div>
      </div> 
    </div>
  </div>
</template>

<style scoped>
.about-content {
  padding: var(--space-md) 0;
  line-height: 1.6;
}

.about-content p {
  margin-bottom: var(--space-md);
}

.callout {
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg);
  width: 100%;
  background: var(--foreground);
  border-radius: var(--border-radius);
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: var(--container-xl);
  gap: var(--space-md);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.page h3 {
  align-self: flex-start;
  width: 100%;
}

.about-heading {
  color: var(--text);
}

.about-description {
  color: var(--text-faded);
}

.about-heading h3 {
  margin-bottom: var(--space-md);
}
</style>