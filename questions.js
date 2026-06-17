const questions = [
  {
    topic: "Unit 1: Conceptualization of PE",
    type: "multiple_choice",
    text: "According to the foundation of Physical Education, what is 'Corporeality'?",
    options: [
      "A biological change of position.",
      "A social construction of the body through education and humanization.",
      "The physical conditioning of the human body.",
      "An intentional and conscious human expression."
    ],
    correctAnswer: "A social construction of the body through education and humanization.",
    explanation: "The body is a social construction. Through education and humanization, it becomes 'corporeality'. Movement that becomes intentional expression is 'motricity'.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 1 }
  },
  {
    topic: "Unit 1: Conceptualization of PE",
    type: "short_answer",
    text: "Explain the difference between 'Movement' and 'Motricity' according to the anthropological realities of PE.",
    keywords: ["biological", "position", "intentional", "conscious", "expression"],
    modelAnswer: "Movement is just a biological change of position, whereas motricity is when movement becomes an intentional and conscious human expression.",
    explanation: "Movement refers to the biological aspect of changing position. Motricity elevates movement to a human expression that is intentional and conscious.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 1 }
  },
  {
    topic: "Unit 2: Curriculum Design",
    type: "multiple_choice",
    text: "Which of the following is NOT one of the 4 fundamental sources of curriculum design?",
    options: [
      "Sociological",
      "Psychological",
      "Economic",
      "Pedagogical"
    ],
    correctAnswer: "Economic",
    explanation: "The curriculum design is based on 4 fundamental sources: Sociological, Psychological, Epistemological, and Pedagogical.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 3 }
  },
  {
    topic: "Unit 2: Curriculum Design",
    type: "short_answer",
    text: "According to the LOMLOE curriculum design (2020), what are three of the specific competences for PE?",
    keywords: ["healthy", "active", "lifestyle", "capacities", "motor", "self-regulation", "cultural", "natural"],
    modelAnswer: "Three specific competences are: 1. Adopting a healthy and active lifestyle. 2. Adapting physical capacities and motor skills. 3. Recognizing cultural motor manifestations.",
    explanation: "The LOMLOE outlines specific competences including healthy lifestyle, adapting motor skills, self-regulation, recognizing cultural manifestations, and valuing environments.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 4 }
  },
  {
    topic: "Unit 3: Curriculum Development",
    type: "multiple_choice",
    text: "At Level 3 of curricular specification, who is responsible for the Classroom Programming?",
    options: [
      "The Educational Administration (MEC & CCAA)",
      "The Educational Center (PEC and PPC)",
      "The PE Teacher",
      "The Students"
    ],
    correctAnswer: "The PE Teacher",
    explanation: "Level 3 is concrete and personalized, where the PE Teacher creates the classroom programming adapted to the specific group's interests.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 5 }
  },
  {
    topic: "Unit 3: Curriculum Development",
    type: "short_answer",
    text: "Describe the 'Proyecto Educativo de Centro (PEC)' and its purpose.",
    keywords: ["teaching", "staff", "intervention", "orientation", "tutoring", "evaluation"],
    modelAnswer: "The PEC is prepared by the teaching staff. It directs the educational intervention process and establishes criteria for orientation, tutoring, evaluation, and student recovery.",
    explanation: "The PEC is a Level 2 document that organizes the curriculum at the school level, guiding the overall educational approach and criteria.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 6 }
  },
  {
    topic: "Unit 4: Content Areas in PE (I)",
    type: "multiple_choice",
    text: "What does 'Spatial perception' involve?",
    options: [
      "The intuitive knowledge of our body at rest.",
      "The exteroceptive sensations from the outside world.",
      "Understanding our body's situation in space and adapting to it.",
      "The plasticity of artistic activity."
    ],
    correctAnswer: "Understanding our body's situation in space and adapting to it.",
    explanation: "Spatial perception involves understanding our body's situation in space and adapting to it, using visual, kinesthetic, auditory, and tactile channels.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 7 }
  },
  {
    topic: "Unit 4: Content Areas in PE (I)",
    type: "short_answer",
    text: "What are the four basic elements used in Body Expression?",
    keywords: ["body", "space", "time", "energy"],
    modelAnswer: "The four basic elements used in body expression are Body, Space, Time, and Energy.",
    explanation: "Body expression relies on the combination of Body, Space, Time, and Energy to communicate internal feelings and artistic expression.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 8 }
  },
  {
    topic: "Unit 5: Content Areas in PE (II)",
    type: "multiple_choice",
    text: "Which of the following are the basic physical capacities?",
    options: [
      "Agility, balance, coordination, and speed",
      "Flexibility, resistance, speed, and strength",
      "Endurance, power, agility, and flexibility",
      "Strength, balance, power, and coordination"
    ],
    correctAnswer: "Flexibility, resistance, speed, and strength",
    explanation: "The basic physical capacities outlined in the notes are flexibility, resistance, speed, and strength.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 9 }
  },
  {
    topic: "Unit 5: Content Areas in PE (II)",
    type: "short_answer",
    text: "What is the difference between chronological age and biological age when teaching motor skills?",
    keywords: ["chronological", "time", "birth", "biological", "maturation", "anatomical"],
    modelAnswer: "Chronological age is the time elapsed since birth, while biological age refers to the degree of anatomical-physiological maturation of the individual.",
    explanation: "Teachers must individualize instruction because a child's developmental readiness (biological age) may differ from their actual age in years (chronological age).",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 9 }
  },
  {
    topic: "Unit 6: Teaching Practice",
    type: "multiple_choice",
    text: "In the 'Teaching Games for Understanding' model, what is emphasized first?",
    options: [
      "Technique before Tactics",
      "Tactics before Technique",
      "Physical conditioning",
      "Mechanical pattern repetition"
    ],
    correctAnswer: "Tactics before Technique",
    explanation: "This model emphasizes understanding tactics before technique so students know why a skill is needed, making them active learners.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 10 }
  },
  {
    topic: "Unit 6: Teaching Practice",
    type: "short_answer",
    text: "Explain the 'Cooperative learning' model and how it differs from collaborative learning.",
    keywords: ["heterogeneous", "groups", "maximize", "learning", "same", "purpose"],
    modelAnswer: "Students work in small, heterogeneous groups to maximize learning. It differs from collaborative learning because cooperative learning requires working with others for the same purpose.",
    explanation: "Cooperative learning involves structured group work where students depend on each other to achieve a shared goal, promoting inclusive education.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 11 }
  },
  {
    topic: "Unit 7: Didactic Intervention",
    type: "multiple_choice",
    text: "What is the highest level (Level 5) of teaching skills for a PE teacher?",
    options: [
      "The PE teacher as a leisure entertainer",
      "The PE teacher as a trainer in values",
      "The PE teacher who individualizes their teaching",
      "The PE teacher who promotes student autonomy"
    ],
    correctAnswer: "The PE teacher who promotes student autonomy",
    explanation: "The highest level of teaching skills is Level 5, where the PE teacher promotes student autonomy.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 12 }
  },
  {
    topic: "Unit 7: Didactic Intervention",
    type: "short_answer",
    text: "What are the three Means of Expression used for Initial Information in a PE class?",
    keywords: ["verbal", "visual", "kinesthetic", "channel"],
    modelAnswer: "The three means of expression are the verbal channel (describing the task), visual channel (demonstrations or visual aids), and kinesthetic channel (manipulating the student's body).",
    explanation: "Teachers use verbal explanations, visual demonstrations, and physical guidance (kinesthetic) to effectively communicate initial information.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 12 }
  },
  {
    topic: "Unit 8: Attention to Diversity",
    type: "multiple_choice",
    text: "Which approach defends the right of all children to access a good education that embraces their differences?",
    options: [
      "Segregation",
      "Exclusion",
      "Integration",
      "Inclusion"
    ],
    correctAnswer: "Inclusion",
    explanation: "Inclusion defends the right of all children to access a good education that embraces their differences, removing segregating brands.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 15 }
  },
  {
    topic: "Unit 8: Attention to Diversity",
    type: "short_answer",
    text: "Provide examples of how tasks can be adapted to facilitate the active participation of all students.",
    keywords: ["rules", "equipment", "skill", "space", "methodology", "facilities"],
    modelAnswer: "Tasks can be adapted by modifying rules (e.g., eliminating direct competition), changing equipment (using softer/larger balls), adjusting skill level and space (bringing targets closer), and altering methodology and facilities.",
    explanation: "Adaptations ensure accessibility and can involve changes to the rules, the equipment used, the spatial requirements, and the teaching methodology.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 16 }
  },
  {
    topic: "Unit 9: ICT in Physical Education",
    type: "multiple_choice",
    text: "According to Bloom's Taxonomy applied to PE Apps, which category do Kahoot and QR code tools belong to?",
    options: [
      "Create",
      "Evaluate",
      "Apply",
      "Remember"
    ],
    correctAnswer: "Apply",
    explanation: "Kahoot and QR code tools are categorized under 'Apply' in Bloom's Taxonomy for PE Apps.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 18 }
  },
  {
    topic: "Unit 9: ICT in Physical Education",
    type: "short_answer",
    text: "What is a critical rule regarding the use of ICT in Physical Education classes?",
    keywords: ["replace", "physical", "motor", "activity"],
    modelAnswer: "ICT cannot and should not ever replace physical motor activity in PE classes.",
    explanation: "While technology can enhance learning, motivation, and conceptual understanding, the core of PE remains physical movement and activity.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 18 }
  },
  {
    topic: "Unit 10: Evaluation in PE",
    type: "multiple_choice",
    text: "Which of the following is considered a negative practice in evaluation?",
    options: [
      "Evaluating with a formative approach.",
      "Involving students in the evaluation process.",
      "Confusing evaluation strictly with grading.",
      "Gathering evidence of learning based on criteria."
    ],
    correctAnswer: "Confusing evaluation strictly with grading.",
    explanation: "Negative practices include confusing evaluation with grading, evaluating only at the end, highlighting only negative aspects, and distorting learning.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 19 }
  },
  {
    topic: "Unit 10: Evaluation in PE",
    type: "short_answer",
    text: "What are the three core methodological principles that any evaluation instrument must adhere to?",
    keywords: ["validity", "reliability", "objectivity"],
    modelAnswer: "The three core methodological principles are Validity, Reliability, and Objectivity.",
    explanation: "For evaluation instruments like checklists or rubrics to be effective and fair, they must be valid, reliable, and objective.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 19 }
  },
  {
    topic: "Unit 11: Planning and Programming",
    type: "multiple_choice",
    text: "What is the difference between a Plan and a Schedule?",
    options: [
      "A plan specifies exact times, while a schedule foresees educational goals.",
      "A plan diagnoses the current state, while a schedule specifies operations by defining exactly where and when they will be carried out.",
      "There is no difference; the terms are interchangeable.",
      "A schedule is a pre-active decision-making process, while a plan is the application phase."
    ],
    correctAnswer: "A plan diagnoses the current state, while a schedule specifies operations by defining exactly where and when they will be carried out.",
    explanation: "Planning foresees educational goals and means, while scheduling comes after and specifies exactly where and when operations will happen.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 21 }
  },
  {
    topic: "Unit 11: Planning and Programming",
    type: "short_answer",
    text: "What are the 3 distinct parts into which every Physical Education session is divided?",
    keywords: ["initial", "main", "final", "part"],
    modelAnswer: "Every Physical Education session is divided into the initial part, the main part, and the final part.",
    explanation: "A standard PE session structure includes a warm-up/initial phase, the core activity or main phase, and a cool-down or final phase.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 22 }
  },
  {
    topic: "Unit 1: Conceptualization of PE",
    type: "multiple_choice",
    text: "During the First Stage (1961-1980) of PE evolution in Spain, what was the dominant model?",
    options: [
      "Constructivist psychopedagogical model",
      "Behaviorist model",
      "Holistic model",
      "Psychomotor education model"
    ],
    correctAnswer: "Behaviorist model",
    explanation: "The First Stage was dominated by a behaviorist model where teaching was one-way, the teacher transmitted knowledge, and evaluation was product-centric.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 1 }
  },
  {
    topic: "Unit 2: Curriculum Design",
    type: "short_answer",
    text: "According to the epistemological source of curriculum design, what is the role of the discipline?",
    keywords: ["internal", "logic", "scientific", "knowledge", "structure"],
    modelAnswer: "The epistemological source provides the internal logic of the discipline and its scientific knowledge structure.",
    explanation: "It defines what Physical Education is as a subject and how its specific knowledge is structured.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 3 }
  },
  {
    topic: "Unit 3: Curriculum Development",
    type: "multiple_choice",
    text: "At Level 2 of curriculum specification, which document formulates the general stage objectives, curricular areas, content blocks, and didactic guidelines?",
    options: [
      "Proyecto Educativo de Centro (PEC)",
      "Propuesta Pedagógica de Ciclo (PPC)",
      "Programación General Anual (PGA)",
      "Classroom Programming"
    ],
    correctAnswer: "Propuesta Pedagógica de Ciclo (PPC)",
    explanation: "The PPC is prepared by the area's teaching team and formulates the general stage objectives, curricular areas, content blocks, and didactic and evaluation guidelines. The PEC, on the other hand, directs the overall educational intervention process.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 6 }
  },
  {
    topic: "Unit 4: Content Areas in PE (I)",
    type: "short_answer",
    text: "Define 'Body image' in the context of perceptual-motor skills.",
    keywords: ["measurable", "responses", "dimensions", "shape", "physical", "structure", "movement", "interacting"],
    modelAnswer: "Body image includes all the measurable responses a child formulates regarding the dimensions, shape, physical structure, and movement possibilities of their body interacting with the environment.",
    explanation: "While body perception is intuitive, body image is the measurable understanding a child has of their physical dimensions and capabilities in relation to their environment.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 7 }
  },
  {
    topic: "Unit 5: Content Areas in PE (II)",
    type: "multiple_choice",
    text: "According to the methodological criteria for teaching motor skills, what should tasks provide?",
    options: [
      "A focus exclusively on competitive results.",
      "Strict standardization with no variability.",
      "A sufficient amount of practice and an increase in variability.",
      "A separation of biological and chronological age."
    ],
    correctAnswer: "A sufficient amount of practice and an increase in variability.",
    explanation: "Tasks should provide a sufficient amount of practice, increase in variability so students can adapt to new situations, and include playful designs.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 9 }
  },
  {
    topic: "Unit 6: Teaching Practice",
    type: "short_answer",
    text: "What is the main characteristic of the 'technical-traditional model' of teaching?",
    keywords: ["technical", "skills", "isolation", "passive", "subjects", "reproduce", "mechanical", "pattern"],
    modelAnswer: "It focuses on learning technical skills first, often in isolation. Students act as passive subjects who execute and reproduce a mechanical pattern.",
    explanation: "In this model, technique comes before tactics, and the teacher makes most of the decisions while the students passively follow.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 10 }
  },
  {
    topic: "Unit 7: Didactic Intervention",
    type: "multiple_choice",
    text: "In giving feedback (Knowledge of Results), what does 'Prescriptive feedback' do?",
    options: [
      "It only tells the student if they were successful or not.",
      "It describes what the student did wrong.",
      "It tells the student how to correct the error for the next attempt.",
      "It ignores the error to maintain motivation."
    ],
    correctAnswer: "It tells the student how to correct the error for the next attempt.",
    explanation: "Prescriptive feedback not only identifies the error but prescribes a solution to fix it.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 13 }
  },
  {
    topic: "Unit 8: Attention to Diversity",
    type: "short_answer",
    text: "Explain the difference between 'Integration' and 'Inclusion' regarding the treatment of diversity.",
    keywords: ["integration", "deficit", "special", "needs", "inclusion", "right", "good", "education", "embraces", "differences"],
    modelAnswer: "Integration points to the deficit, assuming children are carriers of special educational needs. Inclusion defends the right of all children to access a good education that embraces their differences.",
    explanation: "Moving from integration to inclusion requires a real modification of exclusion practices to remove segregating brands and ensure equal opportunities.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 15 }
  },
  {
    topic: "Unit 9: ICT in Physical Education",
    type: "multiple_choice",
    text: "According to Bloom's Taxonomy applied to PE Apps, into which category do applications like PicPlayPost and Vivavideo fall?",
    options: [
      "Analyze",
      "Apply",
      "Create",
      "Evaluate"
    ],
    correctAnswer: "Create",
    explanation: "Video and photo apps such as PicPlayPost and Vivavideo fall under the 'Create' category of Bloom's Taxonomy.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 18 }
  },
  {
    topic: "Unit 10: Evaluation in PE",
    type: "short_answer",
    text: "Explain the difference between Formative and Summative evaluation.",
    keywords: ["process", "during", "improve", "final", "result", "end", "grade"],
    modelAnswer: "Formative evaluation occurs during the learning process to guide and improve it, while summative evaluation occurs at the end to measure the final result or assign a grade.",
    explanation: "Formative is ongoing and focused on improvement; summative is final and focused on assessing achievement.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: [19, 20] }
  },
  {
    topic: "Unit 11: Planning and Programming",
    type: "multiple_choice",
    text: "Which of the following is NOT one of the required elements that a specific teaching unit must outline?",
    options: [
      "Evaluation instruments (Instrumentos de evaluación)",
      "Specific competencies (Competencias específicas)",
      "Dietary guidelines (Pautas dietéticas)",
      "Timing (Temporalización)"
    ],
    correctAnswer: "Dietary guidelines (Pautas dietéticas)",
    explanation: "A teaching unit outlines elements like Title, Cycle, Timing, Competencies, Evaluation criteria, Contents, Activities, Resources, Evaluation instruments, and Grading criteria. Dietary guidelines are not a structural element of the unit.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 22 }
  },
  {
    topic: "Unit 1: Conceptualization of PE",
    type: "multiple_choice",
    text: "In the 'Psycho-corporal Model' of PE (Devís-Devís & Peiró-Velert), what type of pedagogy and evaluation is used?",
    options: [
      "Utilitarian pedagogy with quantitative, product-focused evaluation.",
      "Liberal pedagogy focused on personal well-being, with qualitative process-product evaluation.",
      "Liberal pedagogy focused on social well-being, with socio-critical evaluation.",
      "Directive pedagogy with competitive evaluation."
    ],
    correctAnswer: "Liberal pedagogy focused on personal well-being, with qualitative process-product evaluation.",
    explanation: "The Psycho-corporal Model is based on psychological sciences, uses liberal pedagogy focused on self-esteem and personal well-being, and evaluates qualitatively (process-product).",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 2 }
  },
  {
    topic: "Unit 1: Conceptualization of PE",
    type: "short_answer",
    text: "Describe the Third Stage (1990-2000) of PE evolution in Spain and what law triggered it.",
    keywords: ["LOGSE", "compulsory", "curricular", "constructivist", "holistic", "affective", "cognitive", "emotional"],
    modelAnswer: "The LOGSE law (1990) made PE a compulsory curricular area. The focus shifted to a constructivist psychopedagogical model, adopting a holistic perspective that included affective, cognitive, and emotional goals rather than just physical conditioning.",
    explanation: "This stage was a landmark moment where PE moved beyond physical conditioning to embrace a holistic, constructivist approach involving the whole person.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 2 }
  },
  {
    topic: "Unit 2: Curriculum Design",
    type: "multiple_choice",
    text: "Which approach to learning defines it as the 'construction of meanings'?",
    options: [
      "Behaviorism",
      "Cognitivism",
      "Constructivism",
      "Connectivism"
    ],
    correctAnswer: "Constructivism",
    explanation: "Behaviorism sees learning as response acquisition, Cognitivism as knowledge acquisition, and Constructivism as the construction of meanings. The most modern approach is learning as the achievement of competencies.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 3 }
  },
  {
    topic: "Unit 2: Curriculum Design",
    type: "short_answer",
    text: "According to the curriculum structure, list the key questions the curriculum answers and what element each one corresponds to.",
    keywords: ["what", "teach", "how", "assess", "competences", "objectives", "content", "methodology", "assessment"],
    modelAnswer: "The curriculum answers: 'What is teaching for?' (Key Competences and Objectives), 'What to teach?' (Content), 'How to teach?' (Methodology), 'What, how and when to assess?' (Assessment), and 'When to teach?' (Timing and Sequencing).",
    explanation: "These five fundamental questions define the structure of any curriculum, each corresponding to a core element of educational planning.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 3 }
  },
  {
    topic: "Unit 3: Curriculum Development",
    type: "short_answer",
    text: "Give two examples of cross-cutting areas (áreas transversales) and explain how they apply in PE.",
    keywords: ["peace", "environmental", "health", "moral", "equal", "road", "fair play", "recycled", "habits"],
    modelAnswer: "Examples include Peace Education (promoting fair play in collaboration-opposition sports to prevent violence/racism) and Environmental Education (using recycled materials for activities to promote sustainable development).",
    explanation: "Cross-cutting areas are implicit or explicit contents addressed from all subjects because they have a direct impact on daily life. PE offers unique opportunities to teach them through physical activities.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 6 }
  },
  {
    topic: "Unit 3: Curriculum Development",
    type: "multiple_choice",
    text: "Which key competence involves 'knowing how to use information technologies' and could include using mobile apps in PE?",
    options: [
      "Linguistic communication competence",
      "Entrepreneurial competence",
      "Digital competence",
      "STEM competence"
    ],
    correctAnswer: "Digital competence",
    explanation: "Digital competence involves knowing how to use information technologies. In PE, this is demonstrated through using mobile applications for tracking, analysis, or learning.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 5 }
  },
  {
    topic: "Unit 4: Content Areas in PE (I)",
    type: "multiple_choice",
    text: "What are the main components of the 'Postural scheme' for body knowledge and control?",
    options: [
      "Speed, agility, flexibility, and endurance",
      "Tone, posture, balance, relaxation, and breathing",
      "Laterality, spatial perception, and temporal perception",
      "Body, space, time, and energy"
    ],
    correctAnswer: "Tone, posture, balance, relaxation, and breathing",
    explanation: "The postural scheme is built on five key components: muscle tone, posture, balance, relaxation, and breathing, which together form the foundation for body knowledge and control.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 7 }
  },
  {
    topic: "Unit 4: Content Areas in PE (I)",
    type: "short_answer",
    text: "Why is nature considered the 'largest classroom' for Physical Education?",
    keywords: ["motor", "cognitive", "affective", "social", "environmental", "play", "experiences", "pro-environmental"],
    modelAnswer: "Nature offers great educational and learning possibilities through play and experiences. It covers motor, cognitive, affective, and social development, and is highly effective for fostering environmental education and pro-environmental behaviors.",
    explanation: "Practicing sports in natural settings provides a holistic learning environment that develops all domains of a child's growth while instilling environmental values.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 8 }
  },
  {
    topic: "Unit 5: Content Areas in PE (II)",
    type: "short_answer",
    text: "What are the 6 traits that differentiate a 'sport' from a 'game'?",
    keywords: ["physical", "activity", "motor", "situation", "playful", "competition", "rules", "institutionalization"],
    modelAnswer: "A sport is differentiated from a game by 6 traits: physical activity, motor situation, playful nature, competition, rules, and institutionalization.",
    explanation: "While games can be informal and spontaneous, sports require all six of these characteristics, including formal rules and institutional recognition.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 9 }
  },
  {
    topic: "Unit 5: Content Areas in PE (II)",
    type: "multiple_choice",
    text: "In PE, what should the teacher focus on to promote 'Education in Values' through sports?",
    options: [
      "Maximizing competitive results above all else.",
      "Maximizing positive behaviors (cooperating, supporting partners) and minimizing negative behaviors (disrespect, breaking rules).",
      "Allowing students to self-regulate without teacher intervention.",
      "Focusing exclusively on motor skill development."
    ],
    correctAnswer: "Maximizing positive behaviors (cooperating, supporting partners) and minimizing negative behaviors (disrespect, breaking rules).",
    explanation: "PE and sports are optimal places for the moral development of children. Teachers must actively promote positive behaviors and reduce negative ones.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 9 }
  },
  {
    topic: "Unit 6: Teaching Practice",
    type: "multiple_choice",
    text: "In the 'Sports Education' model, what makes it unique compared to other models?",
    options: [
      "Students are affiliated with a team for an entire season and take on roles like coach, referee, and statistician.",
      "Students work individually on skill drills without team affiliation.",
      "The teacher controls all decisions and students only play.",
      "It eliminates competition entirely in favor of cooperation."
    ],
    correctAnswer: "Students are affiliated with a team for an entire season and take on roles like coach, referee, and statistician.",
    explanation: "The Sports Education model is distinctive because students remain on one team for a full season and experience multiple roles beyond just being players, culminating in a festive final event.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 10 }
  },
  {
    topic: "Unit 6: Teaching Practice",
    type: "short_answer",
    text: "Define 'Gamification' as a teaching model and explain its main purpose.",
    keywords: ["elements", "play", "game", "design", "non-playful", "motivation", "engagement", "effort"],
    modelAnswer: "Gamification consists of using elements of play and game design in non-playful contexts. Its main purpose is to increase students' motivation, engagement, attentional capacity, and effort.",
    explanation: "Gamification borrows mechanics from games (points, levels, challenges) and applies them to educational settings to boost student participation and effort.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 11 }
  },
  {
    topic: "Unit 7: Didactic Intervention",
    type: "short_answer",
    text: "How often should a PE teacher give feedback, and what happens with too much or too little?",
    keywords: ["4", "5", "repetitions", "excess", "dependency", "lack", "prevents", "learning"],
    modelAnswer: "Feedback should be given approximately every 4-5 repetitions. Excess feedback creates dependency in the student, while a lack of feedback prevents learning altogether.",
    explanation: "Finding the right balance of feedback frequency is critical—too much makes students reliant on the teacher, while too little leaves them without guidance to improve.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 13 }
  },
  {
    topic: "Unit 7: Didactic Intervention",
    type: "multiple_choice",
    text: "Which leadership style fosters participation and shared decision-making with active teacher guidance?",
    options: [
      "Authoritarian leadership",
      "Permissive leadership (laissez-faire)",
      "Democratic leadership",
      "Persuasive leadership"
    ],
    correctAnswer: "Democratic leadership",
    explanation: "Democratic leadership fosters student participation and shared decision-making while the teacher maintains active guidance. Authoritarian is too strict, permissive is too passive, and persuasive relies on convincing.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 14 }
  },
  {
    topic: "Unit 8: Attention to Diversity",
    type: "multiple_choice",
    text: "Which subgroup of ACNEAE students represents the largest percentage (40-70%)?",
    options: [
      "Students with high intellectual abilities.",
      "Students with ADHD or dyslexia.",
      "Students with severe ignorance of the learning language or socio-educational vulnerability.",
      "Students with SEN related to disability."
    ],
    correctAnswer: "Students with severe ignorance of the learning language or socio-educational vulnerability.",
    explanation: "Socio-educational vulnerability and severe ignorance of the learning language represent 40-70% of all ACNEAE students, making it by far the largest subgroup.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 15 }
  },
  {
    topic: "Unit 8: Attention to Diversity",
    type: "short_answer",
    text: "Describe the 3-step follow-up protocol for SEN students in PE.",
    keywords: ["preliminary", "study", "diagnosis", "action", "plan", "intervention", "evolution", "evaluation"],
    modelAnswer: "1. Preliminary Study: Analyzing the characteristics of the deficiency, the student's environment, and its impact on PE. 2. Action Plan (Intervention): Designing strategies balancing individual physical needs with group integration. 3. Evolution and Evaluation: Evaluating the ongoing process.",
    explanation: "This structured protocol ensures that SEN students receive systematic, personalized support throughout the PE curriculum rather than ad hoc accommodations.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 16 }
  },
  {
    topic: "Unit 9: ICT in Physical Education",
    type: "short_answer",
    text: "What is the TPACK model and how does it apply to ICT in PE?",
    keywords: ["technological", "pedagogical", "content", "knowledge", "integration", "curricular", "methods"],
    modelAnswer: "TPACK stands for Technological, Pedagogical, and Content Knowledge. It integrates curricular goals (healthy PE), pedagogical methods (cooperation, real challenges), and technology to create effective ICT-mediated learning situations.",
    explanation: "The TPACK framework ensures technology is not used in isolation but is meaningfully integrated with both subject knowledge and effective teaching methods.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 17 }
  },
  {
    topic: "Unit 9: ICT in Physical Education",
    type: "multiple_choice",
    text: "According to Bloom's Taxonomy applied to PE Apps, which cognitive level do Coach's Eye and Runtastic belong to?",
    options: [
      "Remember",
      "Understand",
      "Analyze",
      "Create"
    ],
    correctAnswer: "Analyze",
    explanation: "Coach's Eye, Runtastic, and Sworkit are categorized under 'Analyze' because they help students break down and examine their motor performance data.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 18 }
  },
  {
    topic: "Unit 10: Evaluation in PE",
    type: "multiple_choice",
    text: "Which of the following is NOT one of the 4 main scopes of student evaluation in PE?",
    options: [
      "Motor area",
      "Cognitive field",
      "Financial literacy",
      "Attitudinal area"
    ],
    correctAnswer: "Financial literacy",
    explanation: "The 4 main scopes of evaluation in PE are: Motor area (physical condition and skills), Cognitive field (theoretical-practical knowledge), Attitudinal area (values and social skills), and Key competencies.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 19 }
  },
  {
    topic: "Unit 10: Evaluation in PE",
    type: "short_answer",
    text: "What are the three types of evaluation depending on the benchmark?",
    keywords: ["standard", "comparing", "others", "criterion", "acquired", "themselves", "individual", "progress"],
    modelAnswer: "You can evaluate with reference to the standard (comparing the student to others), with reference to the criterion (verifying what they acquired), or with reference to themselves (verifying individual progress).",
    explanation: "Each benchmark serves a different purpose: the standard compares to peers, the criterion checks mastery of content, and referencing themselves tracks personal growth.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 20 }
  },
  {
    topic: "Unit 11: Planning and Programming",
    type: "short_answer",
    text: "According to Viciana (2001), what are the 4 phases of planning?",
    keywords: ["diagnosis", "design", "realization", "evaluation"],
    modelAnswer: "The 4 planning phases according to Viciana (2001) are: 1. Diagnosis, 2. Design, 3. Realization, and 4. Evaluation.",
    explanation: "This practical framework helps PE teachers structure their planning process from initial assessment through to final review of outcomes.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 21 }
  },
  {
    topic: "Unit 11: Planning and Programming",
    type: "multiple_choice",
    text: "According to the session structure, what percentage of time should the Main Phase occupy?",
    options: [
      "20%",
      "40%",
      "60%",
      "80%"
    ],
    correctAnswer: "60%",
    explanation: "A standard PE session follows the 20-60-20 structure: Warm up (20% — physiological/psychological preparation), Main Phase (60% — peak physical/intellectual activity), and Cool down (20% — physiological/emotional recovery).",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 14 }
  },

  // ═══════════════════════════════════════════
  //  NEW QUESTIONS — 3 MC PER UNIT
  // ═══════════════════════════════════════════

  // ── Unit 1 (3 new MC) ──
  {
    topic: "Unit 1: Conceptualization of PE",
    type: "multiple_choice",
    text: "Which of the following is NOT one of the functions of Physical Education in the school context?",
    options: [
      "Compensatory",
      "Cathartic",
      "Legislative",
      "Hedonistic"
    ],
    correctAnswer: "Legislative",
    explanation: "The functions of PE in school include: compensatory, anatomical, aesthetic/expressive, hygienic, hedonistic, communicative, agonist, and cathartic. 'Legislative' is not a function of PE.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 1 }
  },
  {
    topic: "Unit 1: Conceptualization of PE",
    type: "multiple_choice",
    text: "What characterizes the 2nd stage of PE evolution in Spain (1980-1990)?",
    options: [
      "Behaviorist model focused on product",
      "Sports training focus and competitive effectiveness",
      "Constructivist model with holistic perspective",
      "Implementation of the LOMLOE law"
    ],
    correctAnswer: "Sports training focus and competitive effectiveness",
    explanation: "The 2nd stage (1980-1990) was characterized by a loss of references and a shift towards sports training focus with competitive effectiveness as the main goal.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 2 }
  },
  {
    topic: "Unit 1: Conceptualization of PE",
    type: "multiple_choice",
    text: "According to Devís-Devís & Peiró-Velert (1992), which educational model uses utilitarian pedagogy and directive teaching?",
    options: [
      "Psycho-corporal model",
      "Socio-motor model",
      "Physical-sports model",
      "Constructivist model"
    ],
    correctAnswer: "Physical-sports model",
    explanation: "The Physical-sports model is based on natural sciences, uses utilitarian pedagogy, directive teaching, and quantitative evaluation.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 2 }
  },

  // ── Unit 2 (3 new MC) ──
  {
    topic: "Unit 2: Curriculum Design",
    type: "multiple_choice",
    text: "Which of the following is a NEW curriculum element introduced by the LOMLOE law?",
    options: [
      "Stage Objectives",
      "Output Profile (Perfil de salida)",
      "Key Competences",
      "Evaluation Criteria"
    ],
    correctAnswer: "Output Profile (Perfil de salida)",
    explanation: "The LOMLOE introduced new curriculum elements including the Output Profile (Perfil de salida), Basic Knowledge, and Learning Situations alongside existing elements like Stage Objectives, Key Competences, and Evaluation Criteria.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 4 }
  },
  {
    topic: "Unit 2: Curriculum Design",
    type: "multiple_choice",
    text: "According to the curriculum design, which learning trend defines learning as 'response acquisition'?",
    options: [
      "Constructivism",
      "Cognitivism",
      "Behaviorism",
      "Competency-based learning"
    ],
    correctAnswer: "Behaviorism",
    explanation: "Behaviorism defines learning as response acquisition. Cognitivism defines it as knowledge acquisition, Constructivism as construction of meanings, and the most modern approach focuses on achievement of competencies.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 3 }
  },
  {
    topic: "Unit 2: Curriculum Design",
    type: "multiple_choice",
    text: "The curriculum in the Spanish educational system is characterized as:",
    options: [
      "Closed, mandatory, and rigid",
      "Open, prescriptive, and flexible",
      "Optional, descriptive, and fixed",
      "Experimental, suggestive, and adaptive"
    ],
    correctAnswer: "Open, prescriptive, and flexible",
    explanation: "The Spanish curriculum is open (allows adaptation), prescriptive (sets minimum requirements), and flexible (can be modified by educational centers and teachers).",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 3 }
  },

  // ── Unit 3 (3 new MC) ──
  {
    topic: "Unit 3: Curriculum Development",
    type: "multiple_choice",
    text: "Which key competence is exemplified in PE by 'performing dances from different countries'?",
    options: [
      "Plurilingual competence",
      "Cultural awareness and expression competence",
      "Personal, social and learning to learn competence",
      "Citizenship competence"
    ],
    correctAnswer: "Cultural awareness and expression competence",
    explanation: "Cultural awareness and expression competence is exemplified in PE by performing dances from different countries. Plurilingual competence uses traditional games in foreign languages.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 5 }
  },
  {
    topic: "Unit 3: Curriculum Development",
    type: "multiple_choice",
    text: "What are the characteristics of the 1st level of curriculum concretion?",
    options: [
      "Concrete, personalized, modifiable, shared, innovative",
      "Autonomous, coordinated, coherent",
      "Normative, prescriptive, open/flexible, counsellor",
      "Specific, adaptive, individual, practical"
    ],
    correctAnswer: "Normative, prescriptive, open/flexible, counsellor",
    explanation: "The 1st level (State/Autonomous Communities) is normative, prescriptive, open/flexible, and serves as counsellor. The 2nd level is autonomous, coordinated, coherent. The 3rd level is concrete, personalized, modifiable, shared, innovative.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 5 }
  },
  {
    topic: "Unit 3: Curriculum Development",
    type: "multiple_choice",
    text: "Which cross-cutting area in PE is exemplified by 'having a student act as referee'?",
    options: [
      "Peace Education",
      "Health Education",
      "Moral and Civic Education",
      "Equal Opportunities Education"
    ],
    correctAnswer: "Moral and Civic Education",
    explanation: "Moral and Civic Education is exemplified by having a student act as referee. Peace Education uses fair play, Health Education includes washing up after PE, and Equal Opportunities uses heterogeneous grouping.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 6 }
  },

  // ── Unit 4 (3 new MC) ──
  {
    topic: "Unit 4: Content Areas in PE (I)",
    type: "multiple_choice",
    text: "What are the two pillars of body balance in body expression?",
    options: [
      "Rhythm and coordination",
      "Technique and spontaneity",
      "Strength and flexibility",
      "Body and space"
    ],
    correctAnswer: "Technique and spontaneity",
    explanation: "According to the notes, the two pillars of body balance in body expression are technique and spontaneity.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 8 }
  },
  {
    topic: "Unit 4: Content Areas in PE (I)",
    type: "multiple_choice",
    text: "What are the four currents of body expression?",
    options: [
      "Artistic, Musical, Theatrical, Athletic",
      "Social, Psychological, Artistic, Pedagogical",
      "Physical, Cognitive, Motor, Emotional",
      "Cultural, Scientific, Technical, Practical"
    ],
    correctAnswer: "Social, Psychological, Artistic, Pedagogical",
    explanation: "The four currents of body expression are: Social, Psychological, Artistic, and Pedagogical.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 8 }
  },
  {
    topic: "Unit 4: Content Areas in PE (I)",
    type: "multiple_choice",
    text: "Which type of sensations provide information from the outside world?",
    options: [
      "Interoceptive sensations",
      "Proprioceptive sensations",
      "Exteroceptive sensations",
      "Kinesthetic sensations"
    ],
    correctAnswer: "Exteroceptive sensations",
    explanation: "Exteroceptive sensations provide information from the outside world, while interoceptive sensations provide information from one's own body.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 7 }
  },

  // ── Unit 5 (3 new MC) ──
  {
    topic: "Unit 5: Content Areas in PE (II)",
    type: "multiple_choice",
    text: "How are Basic Motor Skills (BMS) best defined?",
    options: [
      "Advanced athletic techniques for competitive sports",
      "Skills for solving daily problems with high effectiveness and efficiency",
      "Specialized motor patterns learned through repetitive training",
      "Movements that require minimal cognitive involvement"
    ],
    correctAnswer: "Skills for solving daily problems with high effectiveness and efficiency",
    explanation: "Basic Motor Skills are defined as those that allow solving daily problems with high effectiveness and efficiency, such as moving autonomously and reaching objects.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 9 }
  },
  {
    topic: "Unit 5: Content Areas in PE (II)",
    type: "multiple_choice",
    text: "According to the classification of sports by uncertainty, which category does NOT exist?",
    options: [
      "Individual",
      "Collaboration-opposition",
      "Aesthetic",
      "Cooperation"
    ],
    correctAnswer: "Aesthetic",
    explanation: "Sports are classified by uncertainty into four categories: Individual, Collaboration-opposition, Opposition, and Cooperation. 'Aesthetic' is not one of the categories.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 9 }
  },
  {
    topic: "Unit 5: Content Areas in PE (II)",
    type: "multiple_choice",
    text: "When developing basic physical capacities in primary education, evaluation should focus on:",
    options: [
      "The final result and performance numbers",
      "Comparison with standardized national averages",
      "The process rather than the result",
      "Competition rankings among students"
    ],
    correctAnswer: "The process rather than the result",
    explanation: "Physical capacities in primary education must be developed playfully, and evaluation should focus on the process rather than the result, starting with an initial assessment.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 9 }
  },

  // ── Unit 6 (3 new MC) ──
  {
    topic: "Unit 6: Teaching Practice",
    type: "multiple_choice",
    text: "Which of the following is one of the 5 core didactic principles?",
    options: [
      "Competition",
      "Standardization",
      "Globalization",
      "Specialization"
    ],
    correctAnswer: "Globalization",
    explanation: "The 5 core didactic principles are: Communication, Socialization, Globalization, Creativity, and Opening.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 10 }
  },
  {
    topic: "Unit 6: Teaching Practice",
    type: "multiple_choice",
    text: "In the Teaching Games for Understanding (TGfU) model, games are categorized by their internal logic into:",
    options: [
      "Individual, team, combat, and artistic",
      "Invasion, net, field/striking, and precision",
      "Closed, open, mixed, and adaptive",
      "Cooperative, competitive, recreational, and educational"
    ],
    correctAnswer: "Invasion, net, field/striking, and precision",
    explanation: "In TGfU, games are categorized by their internal logic into four types: invasion games, net games, field/striking games, and precision games.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 10 }
  },
  {
    topic: "Unit 6: Teaching Practice",
    type: "multiple_choice",
    text: "What are the four forms of participation in Service Learning?",
    options: [
      "Teaching, coaching, mentoring, and evaluating",
      "Direct service, indirect service, advocacy, and research",
      "Planning, executing, reflecting, and presenting",
      "Observation, practice, feedback, and assessment"
    ],
    correctAnswer: "Direct service, indirect service, advocacy, and research",
    explanation: "Service Learning has 4 forms of participation: direct service, indirect service, advocacy, and research. It starts from a real social need and connects learning with community service.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 11 }
  },

  // ── Unit 7 (3 new MC) ──
  {
    topic: "Unit 7: Didactic Intervention",
    type: "multiple_choice",
    text: "According to research on disruptive behaviors in PE, what percentage is related to the teacher?",
    options: [
      "13%",
      "17%",
      "50%",
      "70%"
    ],
    correctAnswer: "70%",
    explanation: "Disruptive behaviors are related to the teacher (70%), the activity (17%), and colleagues (13%).",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 13 }
  },
  {
    topic: "Unit 7: Didactic Intervention",
    type: "multiple_choice",
    text: "What type of feedback forces the learner to reflect and promotes autonomy?",
    options: [
      "Evaluative feedback",
      "Descriptive feedback",
      "Interrogative feedback",
      "Affective-emotional feedback"
    ],
    correctAnswer: "Interrogative feedback",
    explanation: "Interrogative feedback uses questions to force the learner to reflect on their own performance, promoting autonomy. Affective-emotional feedback focuses on motivation.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 13 }
  },
  {
    topic: "Unit 7: Didactic Intervention",
    type: "multiple_choice",
    text: "How long should a teacher wait before giving feedback in finalist tasks (closed skills)?",
    options: [
      "Immediately, without delay",
      "1-3 seconds",
      "6-20 seconds",
      "At least 60 seconds"
    ],
    correctAnswer: "6-20 seconds",
    explanation: "For finalist tasks (closed skills), the teacher should wait 6-20 seconds before providing feedback. Concurrent feedback is given during the execution for continuous tasks.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 13 }
  },

  // ── Unit 8 (3 new MC) ──
  {
    topic: "Unit 8: Attention to Diversity",
    type: "multiple_choice",
    text: "What does the position of 'Segregation' towards diversity mean?",
    options: [
      "Completely excluding students from the educational system",
      "Separating students into an isolated group",
      "Integrating students with adaptations",
      "Embracing differences as a right to good education"
    ],
    correctAnswer: "Separating students into an isolated group",
    explanation: "Segregation means separating students into an isolated group. Exclusion means completely leaving them out. Integration points to the deficit. Inclusion embraces differences as a right.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 15 }
  },
  {
    topic: "Unit 8: Attention to Diversity",
    type: "multiple_choice",
    text: "Which of the following is a rule adaptation strategy for inclusive PE?",
    options: [
      "Using only essential rules and controlled inequality in team numbers",
      "Eliminating all rules entirely",
      "Making rules more complex to challenge all students equally",
      "Applying the same strict rules regardless of ability"
    ],
    correctAnswer: "Using only essential rules and controlled inequality in team numbers",
    explanation: "Rule adaptations include using only essential rules, eliminating direct competition, and applying controlled inequality (e.g., uneven team numbers to balance ability differences).",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 16 }
  },
  {
    topic: "Unit 8: Attention to Diversity",
    type: "multiple_choice",
    text: "Which of the following is NOT an ACNEAE subgroup?",
    options: [
      "Maturational delay",
      "High intellectual abilities",
      "Gifted athletes",
      "Attention/learning disorders (ADHD, dyslexia, dyscalculia)"
    ],
    correctAnswer: "Gifted athletes",
    explanation: "ACNEAE subgroups include: SEN (disability/severe behavioral disorders), Maturational delay, Attention/learning disorders (ADHD, dyslexia, dyscalculia), Severe ignorance of learning language/socio-educational vulnerability, High intellectual abilities, and Late incorporation. 'Gifted athletes' is not one.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 15 }
  },

  // ── Unit 9 (3 new MC) ──
  {
    topic: "Unit 9: ICT in Physical Education",
    type: "multiple_choice",
    text: "According to Bloom's Taxonomy applied to PE apps, which level corresponds to Google Docs/Forms?",
    options: [
      "Create",
      "Apply",
      "Evaluate",
      "Analyze"
    ],
    correctAnswer: "Evaluate",
    explanation: "In Bloom's Taxonomy for PE Apps: Create (PicPlayPost, Vivavideo), Evaluate (Google Docs/Forms), Analyze (Coach's Eye, Runtastic, Sworkit), Apply (Kahoot, QR/Unitag), Understand (Padlet, Blogger), Remember (Pinterest, Symbaloo).",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 18 }
  },
  {
    topic: "Unit 9: ICT in Physical Education",
    type: "multiple_choice",
    text: "What term describes the historically scarce relationship between PE and technology?",
    options: [
      "Digital divide",
      "Technological impermeability",
      "Technological illiteracy",
      "Digital resistance"
    ],
    correctAnswer: "Technological impermeability",
    explanation: "The notes describe PE's historically scarce relationship with technology as 'technological impermeability', which must be overcome through a paradigm shift.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 17 }
  },
  {
    topic: "Unit 9: ICT in Physical Education",
    type: "multiple_choice",
    text: "According to Bloom's Taxonomy applied to PE, which apps correspond to the 'Remember' level?",
    options: [
      "Kahoot and QR/Unitag",
      "Padlet and Blogger",
      "Pinterest and Symbaloo",
      "Coach's Eye and Runtastic"
    ],
    correctAnswer: "Pinterest and Symbaloo",
    explanation: "Remember level: Pinterest, Symbaloo. Understand level: Padlet, Blogger. Apply level: Kahoot, QR/Unitag. Analyze level: Coach's Eye, Runtastic, Sworkit.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 18 }
  },

  // ── Unit 10 (3 new MC) ──
  {
    topic: "Unit 10: Evaluation in PE",
    type: "multiple_choice",
    text: "Which evaluation instrument uses a YES/NO format?",
    options: [
      "Rubrics",
      "Portfolios",
      "Checklists",
      "Surveys"
    ],
    correctAnswer: "Checklists",
    explanation: "Checklists use a YES/NO format to record whether a behavior or skill is observed. Rubrics use a 1-5 scale to measure levels of achievement.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 20 }
  },
  {
    topic: "Unit 10: Evaluation in PE",
    type: "multiple_choice",
    text: "In the motor area of student evaluation, technique is used to evaluate:",
    options: [
      "Open skills",
      "Closed skills",
      "Cognitive knowledge",
      "Attitudinal behaviors"
    ],
    correctAnswer: "Closed skills",
    explanation: "In the motor area, technique is used for evaluating closed skills, while tactics are used for evaluating open skills.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 19 }
  },
  {
    topic: "Unit 10: Evaluation in PE",
    type: "multiple_choice",
    text: "Which is NOT a purpose of evaluating the teaching staff?",
    options: [
      "Diagnostic",
      "Instructive",
      "Competitive",
      "Developer"
    ],
    correctAnswer: "Competitive",
    explanation: "The purposes of evaluating the teaching staff are: diagnostic, instructive, educational, and developer. 'Competitive' is not one of them.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 20 }
  },

  // ── Unit 11 (3 new MC) ──
  {
    topic: "Unit 11: Planning and Programming",
    type: "multiple_choice",
    text: "According to Viciana's theoretical planning phases, what is the first phase?",
    options: [
      "Design",
      "Evaluation",
      "Realization",
      "Diagnosis"
    ],
    correctAnswer: "Diagnosis",
    explanation: "According to Viciana (2001), the planning phases are: 1. Diagnosis, 2. Design, 3. Realization, 4. Evaluation.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 21 }
  },
  {
    topic: "Unit 11: Planning and Programming",
    type: "multiple_choice",
    text: "What are the three theoretical phases of the planning process?",
    options: [
      "Analysis, Synthesis, Execution",
      "Introduction, Development, Conclusion",
      "Preactive/preinteractive, Interactive, Postactive/reflection",
      "Diagnosis, Implementation, Assessment"
    ],
    correctAnswer: "Preactive/preinteractive, Interactive, Postactive/reflection",
    explanation: "The three theoretical phases of planning are: 1. Preactive/preinteractive (before teaching), 2. Application/interactive (during teaching), and 3. Evaluation/postactive/reflection (after teaching).",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 21 }
  },
  {
    topic: "Unit 11: Planning and Programming",
    type: "multiple_choice",
    text: "According to the notes, what distinguishes expert teachers from novice teachers regarding planning?",
    options: [
      "Experts refuse to plan while novices plan excessively",
      "Experts don't need highly detailed plans; novices need them most but often show lack of interest",
      "Both experts and novices plan at the same level of detail",
      "Novices plan more effectively than experts"
    ],
    correctAnswer: "Experts don't need highly detailed plans; novices need them most but often show lack of interest",
    explanation: "Expert teachers don't need highly detailed plans due to their experience. Novice teachers need planning the most but often show a lack of interest in detailed planning.",
    reference: { file: "APUNTES DIDÁCTICA EDUCACIÓN FÍSICA.pdf", page: 21 }
  }
];

export default questions;
