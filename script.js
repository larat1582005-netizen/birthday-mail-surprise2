/* =========================================================
   BIRTHDAY MAIL SURPRISE - INTERACTION LOGIC
   Matches the reference video flow:

   Scene 1 (mail slot):
     stage 1 -> empty slot + "click here to claim your mail!"
     stage 2 -> envelope peeks out of slot + "click here"
     stage 3 -> envelope fully out, resting below slot + tap hint

   Scene 2 (opened envelope):
     tapping the envelope opens the flap and reveals the
     letter + photos peeking out, plus the cake decoration.

   Scene 3 (full letter):
     tapping the letter switches to the final full-page
     letter with scattered photos.
========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Element references ----------
  const sceneMail   = document.getElementById('scene-mail');
  const sceneOpen    = document.getElementById('scene-open');
  const sceneLetter  = document.getElementById('scene-letter');

  const btnStage     = document.getElementById('btnStage');
  const tapHint      = document.getElementById('tapHint');
  const envelopePeek = document.getElementById('envelopePeek');

  const envelope3d   = document.getElementById('envelope3d');
  const letterPeek   = document.getElementById('letterPeek');
  const cakeDeco      = document.querySelector('#scene-open .cake-deco');

  // ---------- TEXT: button labels for each stage (edit here) ----------
  const STAGE_LABELS = {
    1: 'click here to claim your mail!',
    2: 'click here'
  };

  let stage = 1;
  sceneMail.setAttribute('data-stage', stage);

  // ---------- Scene 1: mail slot button click ----------
  btnStage.addEventListener('click', () => {
    if (stage === 1) {
      stage = 2;
      sceneMail.setAttribute('data-stage', stage);
      btnStage.textContent = STAGE_LABELS[2];
    } else if (stage === 2) {
      stage = 3;
      sceneMail.setAttribute('data-stage', stage);
      // Button is replaced by the tap hint + the envelope becomes tappable
      btnStage.classList.add('hidden');
      tapHint.classList.remove('hidden');
    }
  });

  // Envelope itself becomes clickable once fully revealed (stage 3)
  envelopePeek.addEventListener('click', () => {
    if (stage === 3) {
      goToScene(sceneOpen);
    }
  });

  // ---------- Scene 2: open the envelope flap ----------
  envelope3d.addEventListener('click', (e) => {
    if (!envelope3d.classList.contains('is-open')) {
      envelope3d.classList.add('is-open');
      if (cakeDeco) cakeDeco.classList.add('is-visible');
      return; // first click just opens the flap
    }
    // If already open and the letter itself was clicked, go to full letter
    if (e.target.closest('#letterPeek')) {
      goToScene(sceneLetter);
    }
  });

  // Keyboard accessibility for the letter peek
  letterPeek.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && envelope3d.classList.contains('is-open')) {
      goToScene(sceneLetter);
    }
  });

  // ---------- Helper: switch visible scene ----------
  function goToScene(nextScene) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('is-active'));
    nextScene.classList.add('is-active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

});
